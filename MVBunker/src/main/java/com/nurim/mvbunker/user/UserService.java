package com.nurim.mvbunker.user;

import com.nurim.mvbunker.common.file.MyFileUtils;
import com.nurim.mvbunker.common.mailsender.EmailServiceImpl;
import com.nurim.mvbunker.common.auth.RandomCodeGenerator;
import com.nurim.mvbunker.common.security.IAuthenticationFacade;
import com.nurim.mvbunker.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired private UserMapper mapper;
    @Autowired private RandomCodeGenerator codeGenerator;
    @Autowired private EmailServiceImpl emailService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private MyFileUtils fileUtils;
    @Autowired private IAuthenticationFacade auth;

    public int join(UserEntity param) {
        String authCd = codeGenerator.getRandomCode(5);

        //password encrypt
        String hashedPw = passwordEncoder.encode(param.getUpw());
        param.setUpw(hashedPw);
        param.setAuth(authCd);
        int result = mapper.insUser(param);

        if(result == 1) {
            String subject = "[Movie-Bunker] 인증 메일입니다.";
            String txt = String.format("<a href=\"http://localhost:8090/user/auth?uid=%s&auth=%s\">인증하기</a>"
            , param.getUid(), authCd);
            emailService.sendMimeMessage(param.getUid(), subject, txt);
        }
        return result;
    }

    public int auth(UserEntity param) { return mapper.authUser(param); }

}
