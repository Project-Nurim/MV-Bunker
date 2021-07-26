package com.nurim.mvbunker.movies;

import com.nurim.mvbunker.movies.model.MyMovieDb;
import info.movito.themoviedbapi.model.Genre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/movies")
public class MoviesController {

    @Autowired
    private MoviesService service;
    @Autowired
    @Qualifier("genreMap")
    Map<Integer, String> genreMap;
    @Autowired
    @Qualifier("OriginalGenres")
    List<Genre> OriginalGenres;

    @GetMapping("/boxoffice")
    public void boxoffice(Model model){
        List<MyMovieDb> result = service.getPopularMovies();
        model.addAttribute("boxofficeList", result);
    }

    @GetMapping("/genre")
    public void genre(Model model){
        Map<String, List<MyMovieDb>> genreList = new HashMap<>();
        for(int i = 0; i < OriginalGenres.size(); i++) {
            genreList.put(OriginalGenres.get(i).getName(), service.getGenreMovies(OriginalGenres.get(i).getId()));
        }
        model.addAttribute("genreList", genreList);
    }

    @GetMapping("/genreDetail")
    public void genreDetail(Model model){
        model.addAttribute("movieInfo", null);
    }

    @GetMapping("/recommendation")
    public void recommendation(){

    }

}
