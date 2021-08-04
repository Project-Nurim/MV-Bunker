package com.nurim.mvbunker.user;

import com.nurim.mvbunker.user.model.UserDomain;
import com.nurim.mvbunker.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
    int insUser(UserEntity param);
    int authUser(UserEntity param);
    UserEntity selUser(UserEntity param);
    int updUser(UserEntity param);
    int delUser(UserEntity parma);

    List<UserDomain> selUserProfile(UserEntity param);
}
