package com.nurim.mvbunker.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("movies")
public class MoviesController {

    @Autowired
    private MoviesService service;

    @GetMapping("/boxoffice")
    public void boxoffice(){

    }

    @GetMapping("/genre")
    public void genre(){

    }

    @GetMapping("/genreDetail")
    public void genreDetail(){

    }

    @GetMapping("/recommendation")
    public void recommendation(){

    }

}
