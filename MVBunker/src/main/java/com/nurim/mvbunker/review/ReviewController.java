package com.nurim.mvbunker.review;

import com.nurim.mvbunker.movies.MoviesService;
import info.movito.themoviedbapi.model.Video;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/reviewDetail")
    public void reviewDetail(Model model, int movieId){
        model.addAttribute("movie", moviesService.getMovieDetail(movieId));
        model.addAttribute("videos", moviesService.getMovieVideo(movieId));
    }

//    @ResponseBody
//    @GetMapping(path="/getMovieVideo/{movieId}")
//    public List<Video> getMovieVideo(@PathVariable(name="movieId") int movieId) {
//        return moviesService.getMovieVideo(movieId);
//    }

}
