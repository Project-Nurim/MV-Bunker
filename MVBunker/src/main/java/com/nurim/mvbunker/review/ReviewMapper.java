package com.nurim.mvbunker.review;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.movies.model.HoverVO;
import com.nurim.mvbunker.movies.model.MovieFavEntity;
import com.nurim.mvbunker.review.model.EvalEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.review.model.ReviewEntity;
import com.nurim.mvbunker.user.model.UserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    //Review CRUD
    int checkMyReview(ReviewEntity param);
    int insReview(ReviewEntity param);
    int updReview(ReviewEntity param);
    int delReview(ReviewEntity param);

    //Review select
    ReviewDomain selJustReview(ReviewEntity param);
    List<ReviewDomain> selAllReview(PagingDTO page);
    //특정영화 리뷰목록 출력 >> 인피니티스크롤 기능 빼기!! , PagingDTO page
    List<ReviewDomain> selReview(ReviewEntity param, PagingDTO pagingDTO);

    //Evaluate CRUD
    int insEval(EvalEntity param);
    int checkEval(EvalEntity param);
    EvalEntity selEval(EvalEntity param);
    EvalEntity selMyEval(EvalEntity param);

    //별점평가 select
    double selMovieTotalEval(MovieFavEntity param); //ReviewDetail에서 띄울 것,

}