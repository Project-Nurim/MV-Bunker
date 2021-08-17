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
    List<MovieDomain> selSearchMovies(List<Integer> movieIds);

    //Hover
    List<HoverVO> selHover1(MovieFavEntity param);//영화정보만 띄울 때
    List<HoverVO> selHover2(MovieFavEntity param);//전체리뷰목록, 내가 구독하고 있는 유저의 리뷰목록
}
