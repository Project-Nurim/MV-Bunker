package com.nurim.mvbunker.movies;


import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.TmdbMovies;
import info.movito.themoviedbapi.model.core.MovieResultsPage;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class BeanConfig {
    @Bean
    public TmdbApi getTmdbApi() {
        String api_key = "6956427bb4a25b1080cb617aa6e2194e";
        return new TmdbApi(api_key);
    }


}
