package com.nurim.mvbunker.user;

import com.nurim.mvbunker.common.file.MyFileUtils;
import com.nurim.mvbunker.common.mailsender.EmailServiceImpl;
import com.nurim.mvbunker.common.auth.RandomCodeGenerator;
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
}