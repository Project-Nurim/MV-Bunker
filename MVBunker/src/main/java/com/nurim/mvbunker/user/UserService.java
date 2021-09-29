package com.nurim.mvbunker.user;

import com.nurim.mvbunker.common.file.MyFileUtils;
import com.nurim.mvbunker.common.auth.RandomCodeGenerator;
import com.nurim.mvbunker.common.mailsender.EmailServiceImpl;
import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.common.security.IAuthenticationFacade;
import com.nurim.mvbunker.common.security.UserDetailsServiceImpl;

import com.nurim.mvbunker.movies.model.MovieDomain;
import com.nurim.mvbunker.movies.model.MovieEntity;
import com.nurim.mvbunker.movies.model.MovieFavEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.user.model.UserDomain;

import com.nurim.mvbunker.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
        String realUrl = "/pic/" + target + "/" + saveFileNm;
        if(saveFileNm != null){
                param.setProfileImg(realUrl);
        }

        if(mapper.updUser(param) == 1) {
            loginUser.setProfileImg(realUrl);
        }
    }


    //프로필 메인이미지 변경
    public Map<String, Object> updUserMainProfile(UserEntity param){
        UserEntity loginUser = auth.getLoginUser();
        param.setI_user(auth.getLoginUserPk());

        int result = mapper.updUser(param);
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

    // 프로필 변경
    public int updUserProfile(UserEntity param) {
        param.setI_user(auth.getLoginUserPk());
        int result = mapper.updUser(param);
        UserEntity loginUser = auth.getLoginUser();
        UserEntity modedUser = mapper.selUser(loginUser);
        loginUser.setUnn(modedUser.getUnn());
        loginUser.setProfileImg(modedUser.getProfileImg());
        loginUser.setIntroduce(modedUser.getIntroduce());
        return result;
    }

    // 내가 작성한 리뷰 리스트
    public List<ReviewDomain> selReviewList(UserEntity param, PagingDTO pagingDTO) {
        System.out.println("param is : " + param);
        List<ReviewDomain> result = mapper.selReviewList(param, pagingDTO);
        return result;
    };

    //내가 찜한 영화
    public List<MovieDomain> selFavMovieList(UserEntity param){
        return mapper.selFavMovieList(param);
    }

    //내가 구독한 리뷰어
    public List<UserDomain> mySubUser(UserEntity param){return mapper.mySubUser(param);}

    //팔로워 프로필 디테일
    public UserDomain subUserProfile(UserEntity param){
        return mapper.subUserProfile(param);
    }

    //회원 탈퇴
    public int byeUser(String upw) {
        if(checkPassword(upw)) {
            return mapper.delUser(auth.getLoginUser());
        }else {
            return 0;
        }
    }

    // 비밀번호 체크
    public boolean checkPassword(String upw) {
        System.out.println("패스워드는? : " + upw);
        System.out.println("진실은 ? : " + passwordEncoder.matches(upw, mapper.selUser(auth.getLoginUser()).getUpw()));
        return new BCryptPasswordEncoder().matches(upw, mapper.selUser(auth.getLoginUser()).getUpw());
    }

    //좋아요 누른 리뷰
    public List<ReviewDomain> selLikeReviews(UserEntity param, PagingDTO pagingDTO){
        return mapper.selLikeReviews(param, pagingDTO);
    }
}
