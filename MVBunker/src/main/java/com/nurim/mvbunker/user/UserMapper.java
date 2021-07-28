package com.nurim.mvbunker.user;

import com.nurim.mvbunker.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insUser(UserEntity param);
    int authUser(UserEntity param);
    UserEntity selUser(UserEntity param);
    int updUser(UserEntity param);
}
