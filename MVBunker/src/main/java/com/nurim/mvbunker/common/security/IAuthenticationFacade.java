package com.nurim.mvbunker.common.security;

import com.nurim.mvbunker.user.model.UserEntity;

public interface IAuthenticationFacade {
    UserEntity getLoginUser();
    int getLoginUserPk();
}
