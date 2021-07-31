package com.nurim.mvbunker.review.model;

import lombok.Data;

@Data
public class ReviewCmtEntity {
    private int i_cmt;
    private int i_user;
    private int i_review;
    private String cmt;
    private String regdt;
}
