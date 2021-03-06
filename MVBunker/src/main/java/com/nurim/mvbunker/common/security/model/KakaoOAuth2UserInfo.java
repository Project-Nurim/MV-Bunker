package com.nurim.mvbunker.common.security.model;

import com.nurim.mvbunker.common.security.SocialType;

import java.util.Map;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {
    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        int id = (int)attributes.get("id");
        return Integer.toString(id);
    }

    @Override
    public String getName() {
        return (String) attributes.get("nickname");
    }

    @Override
    public String getEmail() { //카카오는 이메일 정보 제공 X
        return (String) attributes.get("email");
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
        return (String) attributes.get("profile_image");
    }

    @Override
    public String getProvider() {
        return SocialType.KAKAO.getValue();
    }
}