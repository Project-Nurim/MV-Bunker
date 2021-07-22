package com.nurim.mvbunker.common.security.model;

import com.nurim.mvbunker.user.model.UserEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

public class CustomUserPrincipals implements UserDetails, OAuth2User {

    @Getter
    private UserEntity user;
    private Map<String, Object> attributes;

    public CustomUserPrincipals(UserEntity user) { this.user = user; }

    public CustomUserPrincipals(UserEntity user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return user.getUpw();
    }

    @Override
    public String getUsername() {
        if(user.getUid() != null) return user.getUid();
        return user.getEx_key();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getName() {
        return String.valueOf(user.getI_user());
    }
}
