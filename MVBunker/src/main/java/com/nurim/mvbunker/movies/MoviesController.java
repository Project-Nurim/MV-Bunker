package com.nurim.mvbunker.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("movies")
public class MoviesController {

    @Autowired
    private MoviesService service;

    @GetMapping("/boxoffice")
    public void boxoffice(Model model){
        model.addAttribute("boxofficeList",);

    }

    @GetMapping("/genre")
    public void genre(Model model){
        model.addAttribute("genreList",);
    }

    @GetMapping("/genreDetail")
    public void genreDetail(Model model){
        model.addAttribute("movieInfo");
    }

    @GetMapping("/recommendation")
    public void recommendation(){}

}
