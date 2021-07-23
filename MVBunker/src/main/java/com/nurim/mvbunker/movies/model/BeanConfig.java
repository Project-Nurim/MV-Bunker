package com.nurim.mvbunker.movies.model;


import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.TmdbMovies;
import info.movito.themoviedbapi.model.Genre;
import info.movito.themoviedbapi.model.core.MovieResultsPage;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BeanConfig {
    String api_key = "6956427bb4a25b1080cb617aa6e2194e";
    @Bean
    public TmdbApi getTmdbApi() {
        return new TmdbApi(api_key);
    }
    @Bean
    public List<Genre> getGenreList() {
        TmdbApi tmdbApi = new TmdbApi(api_key);
        List<Genre> genreList = tmdbApi.getGenre().getGenreList("ko-KR");
        return genreList;
    }


}
