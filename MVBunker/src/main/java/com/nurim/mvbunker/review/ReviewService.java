package com.nurim.mvbunker.review;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.common.security.IAuthenticationFacade;
import com.nurim.mvbunker.movies.model.MovieEntity;
import com.nurim.mvbunker.movies.model.MovieFavEntity;
import com.nurim.mvbunker.review.model.EvalEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.review.model.ReviewEntity;
import com.nurim.mvbunker.user.UserMapper;
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
    @Autowired
    private UserMapper userMapper;

    public int writeReview(ReviewEntity param) {
        return mapper.insReview(param);
    }
    // selReview
    //모든 리뷰
    public List<ReviewDomain> selAllReview(int page, int orderby) {
        PagingDTO pageDto = new PagingDTO(page, orderby);
        return mapper.selAllReview(pageDto);
    }

    //특정 영화에 달린 리뷰
    public List<ReviewDomain> getReviews(int id) {
        return mapper.selReview(id);
    }

    // Evaluate CRUD
    public int insUpdEval(EvalEntity param) {
        param.setI_user(auth.getLoginUserPk());
        return mapper.insEval(param);
    }
    public int checkEval(EvalEntity param) {
        param.setI_user(auth.getLoginUserPk());
        return mapper.checkEval(param);
    }
    public EvalEntity selEval(EvalEntity param) {
        EvalEntity result = mapper.selEval(param);
        if(result == null) return new EvalEntity();
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

    // Movie Fav Proc
    public int selIsFav(MovieFavEntity param) {
        param.setI_user(auth.getLoginUserPk());
        return userMapper.selIsFav(param);
    }
    public int insMovieFav(MovieFavEntity param) {
        param.setI_user(auth.getLoginUserPk());
        return userMapper.insFavMovie(param);
    }
    public int delMovieFav(MovieFavEntity param) {
        param.setI_user(auth.getLoginUserPk());
        return userMapper.delFavMovie(param);
    }
}
