package com.nurim.mvbunker.review;

import com.nurim.mvbunker.common.model.pagingDTO;
import com.nurim.mvbunker.review.model.ReviewDomain;
import com.nurim.mvbunker.review.model.ReviewEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired private ReviewMapper r_mapper;


    @Autowired
    private ReviewMapper mapper;

    public int writeReview(ReviewEntity param) {
        return mapper.insReview(param);
    }

    public List<ReviewDomain> selAllReview(int page, int orderby) {
        pagingDTO pageDto = new pagingDTO(page, orderby);
        return mapper.selAllReview(pageDto);
    }

    public List<ReviewDomain> getReviews(ReviewEntity param, int page, int orderby) {
        pagingDTO pageDto = new pagingDTO(page, orderby);
        return mapper.selReview(param, pageDto);
    }
}
