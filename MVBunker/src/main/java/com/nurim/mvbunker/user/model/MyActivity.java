package com.nurim.mvbunker.user.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyActivity {
    private int countMyReview;
    private int countMyReview_cmt;
    private int countMyReply;
}
