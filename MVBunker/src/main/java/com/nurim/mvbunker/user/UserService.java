package com.nurim.mvbunker.user;

import com.nurim.mvbunker.common.file.MyFileUtils;
import com.nurim.mvbunker.common.auth.RandomCodeGenerator;
import com.nurim.mvbunker.common.mailsender.EmailServiceImpl;
import com.nurim.mvbunker.common.security.IAuthenticationFacade;
import com.nurim.mvbunker.common.security.UserDetailsServiceImpl;

import com.nurim.mvbunker.user.model.UserDomain;

import com.nurim.mvbunker.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
    @Autowired private UserMapper mapper;
    @Autowired private RandomCodeGenerator codeGenerator;
    @Autowired private EmailServiceImpl emailService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private MyFileUtils fileUtils;

    @Autowired private IAuthenticationFacade auth;
    @Autowired private UserDetailsServiceImpl userDetailsService;
    @Autowired private UserProfileMapper profileMapper;

    public int join(UserEntity param) {
        String authCd = codeGenerator.getRandomCode(5);

        //password encrypt
        String hashedPw = passwordEncoder.encode(param.getUpw());
        param.setUpw(hashedPw);
        param.setAuth(authCd);
        param.setProvider("local");
        int result = userDetailsService.join(param);

        if(result == 1) {
            String subject = "[Movie-Bunker] 인증 메일입니다.";
            String txt = String.format("<a href=\"http://localhost:8090/user/auth?uid=%s&auth=%s\">인증하기</a>"
            , param.getUid(), authCd);
            emailService.sendMimeMessage(param.getUid(), subject, txt);
        }
        return result;
    }

    public int auth(UserEntity param) { return mapper.authUser(param); }

    public void profileImg(MultipartFile img){
        UserEntity loginUser = auth.getLoginUser();
        int iuser = auth.getLoginUserPk();

        String target = "profile/"+iuser;

        UserEntity param = new UserEntity();
        param.setI_user(iuser);

        String saveFileNm = fileUtils.transferTo(img, target);

            if(saveFileNm != null){
                param.setProfileImg(saveFileNm);
            }

            if(profileMapper.insUserProfile(param) == 1 && loginUser.getProfileImg() == null) {
                UserEntity param2 = new UserEntity();
                param2.setI_user(iuser);
                param2.setProfileImg(saveFileNm);

                if(mapper.updUser(param2) == 1){ //1번이면 성공적인 결과! DB의 값을 변경
                    loginUser.setProfileImg(saveFileNm); //security session에 값을 변경!
                }
            }
        }

    public UserDomain selProfileImg(UserEntity param){
        return profileMapper.selUserProfile(param);
    }

    //프로필 메인이미지 변경
    public Map<String, Object> updUserMainProfile(UserEntity param){
        UserEntity loginUser = auth.getLoginUser();
        param.setI_user(auth.getLoginUserPk());

        int result = profileMapper.updUserMainProfile(param);
        if (result == 1){
            loginUser.setProfileImg("");
        }
        Map<String, Object> res = new HashMap<>();
        res.put("result", result);
        res.put("img", param.getProfileImg());

        return res;
    }

    public UserDomain selUserProfile(UserEntity param){
        return mapper.selUserProfile(param);
    }


}