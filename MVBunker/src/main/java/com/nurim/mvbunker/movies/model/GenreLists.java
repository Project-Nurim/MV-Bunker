package com.nurim.mvbunker.movies.model;

import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.Genre;
import info.movito.themoviedbapi.model.MovieDb;
import info.movito.themoviedbapi.model.core.MovieResultsPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class GenreLists {
    @Autowired TmdbApi tmdbApi;

    @Autowired
    @Qualifier("genreMap")
    Map<Integer, String> genreMap;

    public List<MyMovieDb> getMovieListWithGenresName(MovieResultsPage resultsPage) {
        List<MyMovieDb> results = new ArrayList<>();
        List<MovieDb> originList = resultsPage.getResults();
        for(int i = 0 ; i < originList.size() ; i++) {
            results.add(new MyMovieDb(originList.get(i)));
            for(int j = 0 ; j < originList.get(i).getGenres().size(); j++) {
                results.get(i).getGenreNames()
                        .add(genreMap.get(originList.get(i)
                                .getGenres().get(j)));
                results.get(i).setMainGenre(results.get(i).getGenres().get(0));
            }
        }
        return results;
    }

    public MyMovieDb getMovieWithGenre(MovieDb movie) {
        return new MyMovieDb(movie);
    }

}
