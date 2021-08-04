package com.nurim.mvbunker.user;

import com.nurim.mvbunker.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserProfileMapper {
    UserEntity selUserProfile(UserEntity param);
    int insUserProfile(UserEntity param);
    int updUserMainProfile(UserEntity param);
}
