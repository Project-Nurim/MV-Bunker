package com.nurim.mvbunker.movies;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.movies.model.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MoviesMapper {
    int insOriginGenres(GenreEntity param);
    int insMovies(MyMovieDb param);
    int insMoviesGenre(List<MovieGenreEntity> param);
    List<MovieDomain> selPopMovies();
    List<MovieDomain> selMultiGenreMovies(int genreId);
    List<MovieDomain> selGenreMovies(int genreId, PagingDTO pagingDTO);
    MovieDomain selTheMovie(MovieEntity param);
}
