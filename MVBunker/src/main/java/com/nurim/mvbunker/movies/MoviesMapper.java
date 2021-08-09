package com.nurim.mvbunker.movies;

import com.nurim.mvbunker.common.model.pagingDTO;
import com.nurim.mvbunker.movies.model.GenreEntity;
import com.nurim.mvbunker.movies.model.MovieDomain;
import com.nurim.mvbunker.movies.model.MovieEntity;
import com.nurim.mvbunker.movies.model.MyMovieDb;
import info.movito.themoviedbapi.model.MovieDb;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MoviesMapper {
    int insOriginGenres(GenreEntity param);
    int insMovies(MyMovieDb param);
    List<MyMovieDb> selPopMovies();
    MovieDomain selTheMovie(MovieEntity param);
}
