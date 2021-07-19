package com.nurim.mvbunker.common.security;

import com.nurim.mvbunker.user.model.UserEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacadeImpl implements IAuthenticationFacade{

    @Override
    public UserEntity getLoginUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserPrincipal userDetails = (CustomUserPrincipal) auth.getPrincipal();
        return userDetails.getUser();
    }

    @Override
    public int getLoginUserPk() {
        return getLoginUser().getI_user();
    }
}
