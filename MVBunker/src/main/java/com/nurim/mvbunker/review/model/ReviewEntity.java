package com.nurim.mvbunker.review.model;

import lombok.Data;

@Data
public class ReviewEntity {
    private int i_review;
    private int id;
    private String title;
    private String poster;
    private int i_user;
    private String re_ctnt;
    private String regdt;
}
