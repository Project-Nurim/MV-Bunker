package com.nurim.mvbunker.movies.model;


import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.TmdbMovies;
import info.movito.themoviedbapi.model.Genre;
import info.movito.themoviedbapi.model.core.MovieResultsPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class BeanConfig {
    String api_key = "6956427bb4a25b1080cb617aa6e2194e";

    @Bean
    public TmdbApi getTmdbApi() {
        return new TmdbApi(api_key);
    }

    @Bean(name="OriginalGenres")
    public List<Genre> getOriginGenreList() {
        TmdbApi tmdbApi = new TmdbApi(api_key);
        List<Genre> genreList = tmdbApi.getGenre().getGenreList("en-US");
        return genreList;
    }

    @Bean(name="genreMap")
    public Map<Integer, String> getGenreList() {
        List<Genre> genreList = getOriginGenreList();

        Map<Integer,String> genreMap = new HashMap<>();
        for(int i = 0; i < genreList.size(); i++) {
            genreMap.put(genreList.get(i).getId(), genreList.get(i).getName());
        }
        return genreMap;
    }

    @Bean(name="reversGenreMap")
    public Map<String, Integer> getReverseGenreMap() {
        List<Genre> genreList = getOriginGenreList();

        Map<String, Integer> reversGenreMap = new HashMap<>();
        for(int i = 0; i < genreList.size(); i++) {
            reversGenreMap.put(genreList.get(i).getName(), genreList.get(i).getId());
        }
        return reversGenreMap;
    }


}
