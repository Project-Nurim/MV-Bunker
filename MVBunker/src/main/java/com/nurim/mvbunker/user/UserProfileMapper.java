package com.nurim.mvbunker.user;

import com.nurim.mvbunker.user.model.UserEntity;
import com.nurim.mvbunker.user.model.UserProfileEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserProfileMapper {
    UserProfileEntity selUserProfile(UserEntity param);
    int insUserProfile(UserProfileEntity param);
    int updUserMainProfile(UserProfileEntity param);
}
