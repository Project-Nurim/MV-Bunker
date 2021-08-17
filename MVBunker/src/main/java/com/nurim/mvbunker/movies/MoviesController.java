package com.nurim.mvbunker.movies;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.common.security.model.CustomUserPrincipals;
import com.nurim.mvbunker.movies.model.*;
import com.nurim.mvbunker.user.model.UserEntity;
import info.movito.themoviedbapi.model.Genre;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    List<GenreEntity> OriginalGenres;

    @GetMapping("/boxoffice")
    public void boxoffice(Model model){
        List<MovieDomain> result = service.getPopularMovies();
        System.out.println(result.get(0));
        model.addAttribute("boxOfficeList", result);
    }

    @GetMapping("/genre")
    public void genre(Model model, MovieFavEntity param){
        Map<String, List<MovieDomain>> genreList = new HashMap<>();
        for(int i = 0; i < OriginalGenres.size(); i++) {
            List<MovieDomain> list = service.getGenreMovies(OriginalGenres.get(i).getGenreId());
            for(int j = list.size() - 1 ; j > 9 ; j -- ) {
                list.remove(j);
            }
            genreList.put(OriginalGenres.get(i).getGenreName(), list);
        }

        HoverEntity hover = service.selHover1(param);
        model.addAttribute("genreList", genreList);
        model.addAttribute("reverseGenreMap", reversGenreMap);
        model.addAttribute("hover", hover);
    }

    @GetMapping("/genreDetail")
    public void genreDetail(Model model, int genreId){
        List<MovieDomain> list = service.getGenreMovies(genreId);
        model.addAttribute("movieInfo", list);
    }
    @ResponseBody
    @GetMapping("/genreDetailScrolling")
    public List<MovieDomain> genreDetailAjax(int genreId, int page) {
        return service.getGenreMovies(genreId, page);
    }

    @GetMapping("/recommendation")
    public void recommendation(){

    }

    @GetMapping("/search")
    public void search(Model model, String searchText) {
        model.addAttribute("movieList", service.getMovieSearch(searchText));
    }

}
