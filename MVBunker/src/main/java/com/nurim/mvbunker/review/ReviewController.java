package com.nurim.mvbunker.review;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.common.security.IAuthenticationFacade;
import com.nurim.mvbunker.common.security.model.CustomUserPrincipals;
import com.nurim.mvbunker.movies.MoviesService;
import com.nurim.mvbunker.movies.model.HoverVO;
import com.nurim.mvbunker.movies.model.MovieEntity;
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
    public Map<String, Object> getAllReview(Model model, int page, int orderby, MovieFavEntity param) {
        Map<String, Object> result = new HashMap<>();
        List<ReviewDomain> selAllReview = service.selAllReview(page, orderby);
        List<HoverVO> hover = moviesService.selHover2(param);
        result.put("hover",hover);
        result.put("selAllReview",selAllReview);
        return result;
    }

    @GetMapping("/reviewDetail")
    public void reviewDetail(Model model, int movieId){
        EvalEntity evalParam = new EvalEntity();
        evalParam.setId(movieId);
        if(auth.getLoginUser() != null) {
            model.addAttribute("myEval", service.selMyEval(evalParam));
        }
        model.addAttribute("movie", moviesService.getMovieDetail(movieId));
        model.addAttribute("myMovie", moviesService.getMyMovieDetails(movieId));
        model.addAttribute("videos", moviesService.getMovieVideo(movieId));
    }

    @ResponseBody
    @GetMapping("/reviewDetailInfiniteScrolling")
    public List<ReviewDomain> getAllReview(int movieId, int page, int orderby) {
        return reviewService.getReviews(movieId, page, orderby);
    }


    // Eval CRUD
    @ResponseBody
    @PostMapping("/evalRest")
    public Map<String, Object> evaluateinsAndSelEval(@RequestBody EvalEntity param) {
        System.out.println("EvalEntity : " + param);
        Map<String, Object> result = new HashMap<>();
        result.put("working", service.insUpdEval(param));
        result.put("eval", service.selEval(param));
        return result;
    }
    @ResponseBody
    @GetMapping("/getCheckEval")
    public Map<String, Object> getCheckEval(EvalEntity param) {
        Map<String, Object> result = new HashMap<>();
        result.put("myEval", service.selMyEval(param));
        result.put("movieEval", service.selEval(param));
        return result;
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

    // ------------ 영화 좋아요 ------------
    @ResponseBody
    @GetMapping("/favMovie/{movieId}")
    public int selMyFav(@PathVariable(name = "movieId") int id) {
        MovieFavEntity param = new MovieFavEntity();
        param.setId(id);
        return service.selIsFav(param);
    }
    @ResponseBody
    @PostMapping("/favMovie")
    public int insFavMovie(@RequestBody MovieFavEntity param) {
        return service.insMovieFav(param);
    }
    @ResponseBody
    @DeleteMapping("/favMovie/{movieId}")
    public int delFavMovie(@PathVariable(name="movieId") int id) {
        MovieFavEntity param = new MovieFavEntity();
        param.setId(id);
        return service.delMovieFav(param);
    }



}
