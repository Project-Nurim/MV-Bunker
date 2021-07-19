package com.nurim.mvbunker.common.security.model;

import com.nurim.mvbunker.common.security.SocialType;

import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo {
    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
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
        char gender_ch = (char) attributes.get("gender");
        switch (gender_ch) {
            case 'F':
                return 2;
            case 'M':
                return 1;
            case 'U':
                return 0;
        }
        return 0;
    }

    @Override
    public int getAge() {
        return (int) attributes.get("age");
    }

    @Override
    public String getNickname() {
        return (String) attributes.get("nickname");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("profile_image");
    }

    @Override
    public String getProvider() {
        return SocialType.NAVER.getValue();
    }
}