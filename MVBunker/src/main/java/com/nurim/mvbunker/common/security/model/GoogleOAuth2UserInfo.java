package com.nurim.mvbunker.common.security.model;

import com.nurim.mvbunker.common.security.SocialType;

import java.util.Map;

public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public int getGender() {
        return 0;
    }

    @Override
    public int getAge() {
        return 0;
    }

    @Override
    public String getNickname() {
        return null;
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }

    @Override
    public String getProvider() {
        return SocialType.GOOGLE.getValue();
    }
}