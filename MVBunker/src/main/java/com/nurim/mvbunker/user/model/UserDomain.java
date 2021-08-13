package com.nurim.mvbunker.user.model;

import lombok.Data;

@Data
public class UserDomain extends UserEntity {
    private int countMyReview;
    private int countMyReview_cmt;
    private int countMyReply;
    private int countMyReviewLike;
}
