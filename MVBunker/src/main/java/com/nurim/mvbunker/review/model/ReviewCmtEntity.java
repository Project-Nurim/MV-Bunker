package com.nurim.mvbunker.review.model;

import lombok.Data;

@Data
public class ReviewCmtEntity {
    private int i_user;
    private int i_cmt;
    private String cmt;
    private String regdt;
}
