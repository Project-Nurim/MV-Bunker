package com.nurim.mvbunker.review;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.common.security.IAuthenticationFacade;
import com.nurim.mvbunker.common.security.model.CustomUserPrincipals;
import com.nurim.mvbunker.movies.MoviesService;
import com.nurim.mvbunker.movies.model.MovieFavEntity;
import com.nurim.mvbunker.review.model.EvalEntity;
import com.nurim.mvbunker.review.model.ReviewEntity;
import com.nurim.mvbunker.user.model.UserEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import info.movito.themoviedbapi.model.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewService service;
    @Autowired
    private MoviesService moviesService;
    @Autowired
    private ReviewService reviewService;
    @Autowired
    IAuthenticationFacade auth;

    @GetMapping("/review")
    public void review(){}

    @ResponseBody
    @GetMapping("/getAllReview")
    public void getAllReview(Model model, int page, int orderby, MovieFavEntity param) {
        model.addAttribute("hover",moviesService.selHover2(param));
        model.addAttribute("selAllReview",service.selAllReview(page, orderby));
    }

    @GetMapping("/reviewDetail")
    public void reviewDetail(Model model, int movieId){
        EvalEntity evalParam = new EvalEntity();
        evalParam.setId(movieId);
        if(auth.getLoginUser() != null) {
            model.addAttribute("myEval", service.selMyEval(evalParam));
        }
        model.addAttribute("movie", moviesService.getMovieDetail(movieId));
        model.addAttribute("videos", moviesService.getMovieVideo(movieId));
    }

    @ResponseBody
    @GetMapping("/reviewDetailInfiniteScrolling")
    public List<ReviewDomain> getAllReview(int movieId, int page, int orderby) {
        return reviewService.getReviews(movieId, page, orderby);
    }


    // Eval CRUD
    @ResponseBody
    @PostMapping("/EvalRest")
    public EvalEntity insAndSelEval(@RequestBody EvalEntity param) {
        service.insUpdEval(param);
        return service.selEval(param);
    }


    // Personal Review CRUD
    @ResponseBody
    @PostMapping("/reviewRest")
    public ReviewDomain insReview(@RequestBody ReviewEntity param) {
        return service.insAndSelReview(param);
    }

    @ResponseBody
    @PutMapping("/reviewRest")
    public int updReview(@RequestBody ReviewEntity param) {
        return service.updReview(param);
    }

    @ResponseBody
    @DeleteMapping("/reviewRest")
    public int delReview(@RequestBody ReviewEntity param) {
        return service.delReview(param);
    }



//    @ResponseBody
//    @GetMapping(path="/getMovieVideo/{movieId}")
//    public List<Video> getMovieVideo(@PathVariable(name="movieId") int movieId) {
//        return moviesService.getMovieVideo(movieId);
//    }


}
