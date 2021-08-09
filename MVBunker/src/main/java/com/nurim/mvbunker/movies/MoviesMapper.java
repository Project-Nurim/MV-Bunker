package com.nurim.mvbunker.movies;

import com.nurim.mvbunker.common.model.pagingDTO;
import com.nurim.mvbunker.movies.model.*;
import info.movito.themoviedbapi.model.MovieDb;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MoviesMapper {
    int insOriginGenres(GenreEntity param);
    int insMovies(MyMovieDb param);
    int insMoviesGenre(List<MovieGenreEntity> param);
    List<MovieDomain> selPopMovies();
    MovieDomain selTheMovie(MovieEntity param);
}
