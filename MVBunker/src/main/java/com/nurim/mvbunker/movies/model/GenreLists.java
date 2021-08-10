package com.nurim.mvbunker.movies.model;

import com.nurim.mvbunker.movies.MoviesMapper;
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
    MoviesMapper moviesMapper;

    @Autowired
    @Qualifier("genreMap")
    Map<Integer, String> genreMap;

    public int insMovieListAndGenres(MovieResultsPage resultsPage) {
        int result = 0;
        List<MovieDb> originList = resultsPage.getResults();
        for(int i = 0 ; i < originList.size() ; i++) {
            MyMovieDb movieDb = new MyMovieDb(originList.get(i));
            movieDb.setMainGenre(originList.get(i).getGenres().get(0));
            result += moviesMapper.insMovies(movieDb);
            List<MovieGenreEntity> genreList = new ArrayList<>();
            for(int j = 0 ; j < originList.get(i).getGenres().size(); j++) {
                MovieGenreEntity movieGenreEntity = new MovieGenreEntity();
                movieGenreEntity.setId(movieDb.getId());
                movieGenreEntity.setGenreId(movieDb.getGenres().get(j));
                genreList.add(movieGenreEntity);
                System.out.println(movieGenreEntity);
            }
            moviesMapper.insMoviesGenre(genreList);
        }
        return result;
    }

    public MyMovieDb getMovieWithGenre(MovieDb movie) {
        return new MyMovieDb(movie);
    }

}
