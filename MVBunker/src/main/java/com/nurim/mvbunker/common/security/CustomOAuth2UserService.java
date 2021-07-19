package com.nurim.mvbunker.common.security;

import com.nurim.mvbunker.common.security.model.*;
import com.nurim.mvbunker.user.model.UserEntity;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserDetailsServiceImpl myUserService;

    @SneakyThrows
    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        String registrationId = oAuth2UserRequest.getClientRegistration().getRegistrationId();

        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String, Object> modifyAttributes = modifyUserAttributes(registrationId, attributes);

        OAuth2UserInfo userInfo = getOauth2UserInfo(registrationId, modifyAttributes);

        UserEntity user = convertOauthToUserEntity(userInfo);
        UserEntity chkUser = myUserService.loadUserByUsernameAndProvider(user.getUid(), user.getProvider());
        if(chkUser == null) {
            myUserService.join(user);
            chkUser = user;
        }
        CustomUserPrincipals loginUser = new CustomUserPrincipals(chkUser, attributes);
        return loginUser;
        
    }

    private UserEntity convertOauthToUserEntity(OAuth2UserInfo userInfo) {
        UserEntity user = UserEntity.builder()
                .uid(userInfo.getEmail())
                .unm(userInfo.getName())
                .provider(userInfo.getProvider())
                .ex_key(userInfo.getId())
                .age(userInfo.getAge())
                .gender(userInfo.getGender())
                .profileImg(userInfo.getImageUrl())
                .unn(userInfo.getNickname())
                .build();
        return user;
    }

    private OAuth2UserInfo getOauth2UserInfo(String registrationId, Map<String, Object> attributes) throws OAuth2AuthenticationProcessingException {
        if(registrationId.equalsIgnoreCase(SocialType.GOOGLE.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(SocialType.FACEBOOK.toString())) {
            return new FacebookOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(SocialType.KAKAO.toString())) {
            return new KakaoOAuth2UserInfo(attributes);
        } else if (registrationId.equalsIgnoreCase(SocialType.NAVER.toString())) {
            return new NaverOAuth2UserInfo(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }

    private Map<String, Object> modifyUserAttributes(String registrationId, Map<String, Object> attributes) {
        Map<String, Object> mod = new HashMap(attributes); // 그대로 어트리뷰트를 새로운 맵에 담아 생성
        switch(registrationId) {
            case "naver":
                LinkedHashMap responseData = (LinkedHashMap) mod.get("response"); // response 객체가 넘어온다.
                mod.putAll(responseData); // 이러면 mod 로부터 1차로 데이터들을 받을 수 있다.
                mod.remove("response"); // 필요없는 response 는 지워준다.
                break;
            case "kakao":
                LinkedHashMap propertiesData = (LinkedHashMap) mod.get("properties"); // 카카오는 properties 안에 있다.
                mod.putAll(propertiesData);
                mod.remove("properties");
                break;
        }
        return mod;
    }
}