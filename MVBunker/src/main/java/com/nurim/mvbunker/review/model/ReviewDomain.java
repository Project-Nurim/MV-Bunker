package com.nurim.mvbunker.review.model;

import lombok.Data;

@Data
public class ReviewDomain extends ReviewEntity{
    private int review_like_cnt;
    private int review_dislike_cnt;
    private int review_cmt_cnt;
}
