package com.nurim.mvbunker.movies;

import com.nurim.mvbunker.movies.model.GenreLists;
import com.nurim.mvbunker.movies.model.MyMovieDb;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.Genre;
import info.movito.themoviedbapi.model.core.MovieResultsPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MoviesService {
    @Autowired
    private TmdbApi tmdbApi;
    @Autowired
    private GenreLists MyGenreList;

    public List<MyMovieDb> getPopularMovies() {
        MiniComparator comp = new MiniComparator();
        List<MyMovieDb> popMovieList = MyGenreList.getMovieListWithGenresName(tmdbApi.getMovies().getPopularMovies("ko-KR", 1));
        popMovieList.sort(comp);

        return popMovieList;
    }
}
