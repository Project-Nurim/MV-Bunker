package com.nurim.mvbunker.common.security;

import com.nurim.mvbunker.user.model.UserDomain;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacadeImpl implements IAuthenticationFacade{

    @Override
    public UserDomain getLoginUser() {
        return null;
    }

    @Override
    public int getLoginUserPk() {
        return 0;
    }
}
