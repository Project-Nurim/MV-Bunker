package com.nurim.mvbunker.review;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.movies.model.HoverVO;
import com.nurim.mvbunker.movies.model.MovieFavEntity;
import com.nurim.mvbunker.review.model.EvalEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.review.model.ReviewEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    //Review CRUD
    int insReview(ReviewEntity param);
    int updReview(ReviewEntity param);
    int delReview(ReviewEntity param);

    //Review select
    ReviewDomain selJustReview(ReviewEntity param);
    List<ReviewDomain> selAllReview(PagingDTO page);
    List<ReviewDomain> selReview(int id, PagingDTO page);

    //Evaluate CRUD
    int insEval(EvalEntity param);
    int updEval(EvalEntity param);

    //별점평가 select
    EvalEntity selEval(EvalEntity param);
    EvalEntity selMyEval(EvalEntity param);
    double selMovieTotalEval(MovieFavEntity param); //ReviewDetail에서 띄울 것,

}