package com.nurim.mvbunker.movies.model;


import com.nurim.mvbunker.movies.MoviesMapper;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.TmdbMovies;
import info.movito.themoviedbapi.model.Genre;
import info.movito.themoviedbapi.model.core.MovieResultsPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class BeanConfig {
    String api_key = "6956427bb4a25b1080cb617aa6e2194e";

    @Autowired private MoviesMapper mapper;

    @Bean
    public TmdbApi getTmdbApi() {
        return new TmdbApi(api_key);
    }

    @Bean(name="OriginalGenres")
    public List<GenreEntity> getOriginGenreList() {
        TmdbApi tmdbApi = new TmdbApi(api_key);
        List<Genre> originGenreList = tmdbApi.getGenre().getGenreList("en-US");
        List<GenreEntity> genreList = new ArrayList<>();
        for (Genre genre : originGenreList) {
            GenreEntity temp = new GenreEntity();
            temp.setGenreId(genre.getId());
            temp.setGenreName(genre.getName());
            genreList.add(temp);
            mapper.insOriginGenres(temp);
        }
        return genreList;
    }

    @Bean(name="genreMap")
    public Map<Integer, String> getGenreList() {
        List<GenreEntity> genreList = getOriginGenreList();

        Map<Integer,String> genreMap = new HashMap<>();
        for(int i = 0; i < genreList.size(); i++) {
            genreMap.put(genreList.get(i).getGenreId(), genreList.get(i).getGenreName());
        }
        return genreMap;
    }

    @Bean(name="reversGenreMap")
    public Map<String, Integer> getReverseGenreMap() {
        List<GenreEntity> genreList = getOriginGenreList();

        Map<String, Integer> reversGenreMap = new HashMap<>();
        for(int i = 0; i < genreList.size(); i++) {
            reversGenreMap.put(genreList.get(i).getGenreName(), genreList.get(i).getGenreId());
        }
        return reversGenreMap;
    }


}
