package com.nurim.mvbunker.review;

import com.nurim.mvbunker.review.model.EvalEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.review.model.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    int insReview(ReviewEntity param);
    List<ReviewDomain> selReview(ReviewEntity param);
    List<ReviewDomain> selReview_desc(ReviewEntity param);
    List<ReviewDomain> selReview_asc(ReviewEntity param);
    int updReview(ReviewEntity param);
    int delReview(ReviewEntity param);

    int insEval(EvalEntity param);
    EvalEntity selEval(EvalEntity param);
    EvalEntity selMyEval(EvalEntity param);
    int updEval(EvalEntity param);


}