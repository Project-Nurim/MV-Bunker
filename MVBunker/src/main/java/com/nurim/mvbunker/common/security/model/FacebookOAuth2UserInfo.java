package com.nurim.mvbunker.common.security.model;

import com.nurim.mvbunker.common.security.SocialType;

import java.util.Map;

public class FacebookOAuth2UserInfo  extends OAuth2UserInfo {
    public FacebookOAuth2UserInfo(Map<String, Object> attributes) {
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
        if(attributes.containsKey("picture")) {
            Map<String, Object> pictureObj = (Map<String, Object>) attributes.get("picture");
            if(pictureObj.containsKey("data")) {
                Map<String, Object>  dataObj = (Map<String, Object>) pictureObj.get("data");
                if(dataObj.containsKey("url")) {
                    return (String) dataObj.get("url");
                }
            }
        }
        return null;
    }

    @Override
    public String getProvider() {
        return SocialType.FACEBOOK.getValue();
    }
}