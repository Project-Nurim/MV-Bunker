package com.nurim.mvbunker.movies;

import com.nurim.mvbunker.movies.model.MyMovieDb;
import info.movito.themoviedbapi.model.Genre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/movies")
public class MoviesController {

    @Autowired
    private MoviesService service;

    @Autowired
    @Qualifier("reversGenreMap")
    Map<String, Integer> reversGenreMap;

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
            List<MyMovieDb> list = service.getGenreMovies(OriginalGenres.get(i).getId());
            for(int j = list.size() - 1 ; j > 9 ; j -- ) {
                list.remove(j);
            }
            genreList.put(OriginalGenres.get(i).getName(), list);
        }
        model.addAttribute("genreList", genreList);
        model.addAttribute("reverseGenreMap", reversGenreMap);
    }

    @GetMapping("/genreDetail")
    public void genreDetail(Model model, int genreId){
        List<MyMovieDb> list = service.getGenreMovies(genreId);
        model.addAttribute("movieInfo", list);
    }
    @ResponseBody
    @GetMapping("/genreDetailScrolling")
    public List<MyMovieDb> genreDetailAjax(int genreId, int page) {
        return service.getGenreMovies(genreId, page);
    }

    @GetMapping("/recommendation")
    public void recommendation(){

    }

}
