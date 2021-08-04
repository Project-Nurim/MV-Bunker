package com.nurim.mvbunker.review;

import com.nurim.mvbunker.common.security.model.CustomUserPrincipals;
import com.nurim.mvbunker.movies.MoviesService;
import com.nurim.mvbunker.user.model.UserEntity;
import com.nurim.mvbunker.review.model.ReviewDomain;
import info.movito.themoviedbapi.model.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewService service;
    @Autowired
    private MoviesService moviesService;

    @GetMapping("/review")
    public void review(){}

    @ResponseBody
    @GetMapping("/getAllReview")
    public List<ReviewDomain> getAllReview(int page, int orderby) {
        return service.selAllReview(page, orderby);
    }

    @GetMapping("/reviewDetail")
    public void reviewDetail(Model model, int movieId){
        model.addAttribute("movie", moviesService.getMovieDetail(movieId));
        model.addAttribute("videos", moviesService.getMovieVideo(movieId));
    }

    @GetMapping("/myReview")
    public void myReview (Model model, @AuthenticationPrincipal CustomUserPrincipals userDetails){
        UserEntity loginUser = userDetails.getUser();

    }

//    @ResponseBody
//    @GetMapping(path="/getMovieVideo/{movieId}")
//    public List<Video> getMovieVideo(@PathVariable(name="movieId") int movieId) {
//        return moviesService.getMovieVideo(movieId);
//    }


}
