package com.nurim.mvbunker.user.model;

import lombok.Data;

@Data
public class UserEntity {
    private int i_user;
    private String uid;
    private String upw;
    private String unm;
    private int gender;
    private int age;
    private String unn;
    private String profileImg;
    private String regdt;
    private String auth;
}
