package com.nurim.mvbunker.common.security;

import com.nurim.mvbunker.user.UserMapper;
import com.nurim.mvbunker.user.model.UserDomain;
import com.nurim.mvbunker.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired private UserMapper mapper;


    @Override
    public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
        UserEntity param = new UserEntity();
        param.setUid(uid);

        UserDomain loginUser = mapper.selUser(param);
        if(loginUser == null) {
            return null;
        }
        return new UserDetailsImpl(loginUser);
    }
}
