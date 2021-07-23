package com.nurim.mvbunker.movies;

import com.nurim.mvbunker.movies.model.MyMovieDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/movies")
public class MoviesController {

    @Autowired
    private MoviesService service;

    @GetMapping("/boxoffice")
    public void boxoffice(Model model){
        List<MyMovieDb> result = service.getPopularMovies();
        model.addAttribute("boxofficeList", result);
    }

    @GetMapping("/genre")
    public void genre(Model model){
        model.addAttribute("genreList", null);
    }

    @GetMapping("/genreDetail")
    public void genreDetail(Model model){
        model.addAttribute("movieInfo");
    }

    @GetMapping("/recommendation")
    public void recommendation(){}

}
