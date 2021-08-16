package com.nurim.mvbunker.review;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.review.model.EvalEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.review.model.ReviewEntity;
import com.nurim.mvbunker.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    int insReview(ReviewEntity param);
    ReviewDomain selJustReview(ReviewEntity param);
    List<ReviewDomain> selAllReview(PagingDTO page);
    List<ReviewDomain> selAllReviewCount(PagingDTO page);
    List<ReviewDomain> selReview(ReviewEntity param, PagingDTO page);
    int updReview(ReviewEntity param);
    int delReview(ReviewEntity param);

    int insEval(EvalEntity param);
    EvalEntity selEval(EvalEntity param);
    EvalEntity selMyEval(EvalEntity param);
    int updEval(EvalEntity param);


}