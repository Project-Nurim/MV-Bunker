package com.nurim.mvbunker.movies;

import com.nurim.mvbunker.movies.model.*;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.Genre;
import info.movito.themoviedbapi.model.Video;
import info.movito.themoviedbapi.model.core.MovieResultsPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MoviesService {
    @Autowired
    private TmdbApi tmdbApi;
    @Autowired
    private GenreLists MyGenreList;
    @Autowired
    private MyTmdbApi myTmdbApi;
    @Autowired
    private MoviesMapper mapper;

    public List<MovieDomain> getPopularMovies() {
        MiniComparator comp = new MiniComparator();
        List<MyMovieDb> popMovieList = MyGenreList.getMovieListWithGenresName(tmdbApi.getMovies().getPopularMovies("ko-KR", 1));
        popMovieList.sort(comp);
        for(MyMovieDb movie : popMovieList) {
            mapper.insMovies(movie);
            List<MovieGenreEntity> movieGenreList = new ArrayList<>();
            for(int i = 0; i < movie.getGenres().size() ; i++) {
                MovieGenreEntity movieGenre = new MovieGenreEntity();
                movieGenre.setGenreId(movie.getGenres().get(i));
                movieGenre.setId(movie.getId());
                movieGenreList.add(movieGenre);
            }
            mapper.insMoviesGenre(movieGenreList);
        }
        return mapper.selPopMovies();
    }

    public List<MyMovieDb> getGenreMovies(int genreId) {
        List<MyMovieDb> result = MyGenreList.getMovieListWithGenresName(myTmdbApi.getMoviesWithGenre(genreId));
        for(MyMovieDb movie : result) {
            mapper.insMovies(movie);
        }
        return result;
    }
    public List<MyMovieDb> getGenreMovies(int genreId, int page) {
        return MyGenreList.getMovieListWithGenresName(myTmdbApi.getMoviesWithGenre(genreId, page));
    }
    public MyMovieDb getMovieDetail(int movieId) {
        return MyGenreList.getMovieWithGenre(tmdbApi.getMovies().getMovie(movieId, "ko-KR"));
    }
    public List<Video> getMovieVideo(int movieId) {
        return tmdbApi.getMovies().getVideos(movieId, "ko-KR");
    }
}
