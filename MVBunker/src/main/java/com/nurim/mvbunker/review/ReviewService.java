package com.nurim.mvbunker.review;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.common.security.IAuthenticationFacade;
import com.nurim.mvbunker.movies.model.MovieEntity;
import com.nurim.mvbunker.movies.model.MovieFavEntity;
import com.nurim.mvbunker.review.model.EvalEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.review.model.ReviewEntity;
import com.nurim.mvbunker.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private IAuthenticationFacade auth;
    @Autowired
    private ReviewMapper mapper;

    public int writeReview(ReviewEntity param) {
        return mapper.insReview(param);
    }

    // 모든 리뷰 sel
    public List<ReviewDomain> selAllReview(int page, int orderby) {
        PagingDTO pageDto = new PagingDTO(page, orderby);
        return mapper.selAllReview(pageDto);
    }

    // 특정 영화에 달린 리뷰 sel
    public List<ReviewDomain> getReviews(int id, int page, int orderby) {
        PagingDTO pagingDTO = new PagingDTO(page, orderby);
        return mapper.selReview(id, pagingDTO);
    }


    // Evaluate CRUD
    public int insUpdEval(EvalEntity param) {
        return mapper.insEval(param);
    }
    public EvalEntity selEval(EvalEntity param) {
        return mapper.selEval(param);
    }
    public EvalEntity selMyEval(EvalEntity param) {
        param.setI_user(auth.getLoginUserPk());
        return mapper.selMyEval(param);
    }


    // Review CRUD
    public ReviewDomain insAndSelReview(ReviewEntity param) {
        param.setI_user(auth.getLoginUserPk());
        mapper.insReview(param);
        return mapper.selJustReview(param);
    }
    public int updReview(ReviewEntity param) {
        return mapper.updReview(param);
    }
    public int delReview(ReviewEntity param) {
        return mapper.delReview(param);
    }

    //hover
    public void hover(MovieFavEntity param){

//        mapper.selMovieTotalEval(param);
    }
}
