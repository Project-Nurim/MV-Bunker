package com.nurim.mvbunker.common.security;

import com.nurim.mvbunker.user.model.UserDomain;

public interface IAuthenticationFacade {
    UserDomain getLoginUser();
    int getLoginUserPk();
}
