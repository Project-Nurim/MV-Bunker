package com.nurim.mvbunker.movies;

import com.nurim.mvbunker.common.model.PagingDTO;
import com.nurim.mvbunker.movies.model.*;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.Video;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        MyGenreList.insMovieListAndGenres(tmdbApi.getMovies().getPopularMovies("ko-KR", 1));
        return mapper.selPopMovies();
    }

    public List<MovieDomain> getGenreMovies(int genreId) {
        PagingDTO pageDto = new PagingDTO(1, 0, 10);
        List<MovieDomain> result = mapper.selGenreMovies(genreId, pageDto);
        if(result.size() == pageDto.getListLength()) {
            return result;
        }
        MyGenreList.insMovieListAndGenres(myTmdbApi.getMoviesWithGenre(genreId));
        return mapper.selGenreMovies(genreId, pageDto);
    }
    public List<MovieDomain> getGenreMovies(int genreId, int page) {
        PagingDTO pagingDTO = new PagingDTO(page, 0, 20);
        List<MovieDomain> result = mapper.selGenreMovies(genreId, pagingDTO);
        if(result.size() == pagingDTO.getListLength()) {
            return result;
        }
        MyGenreList.insMovieListAndGenres(myTmdbApi.getMoviesWithGenre(genreId, page));
        MyGenreList.insMovieListAndGenres(myTmdbApi.getMoviesWithGenre(genreId, page + 1));
        return mapper.selGenreMovies(genreId, pagingDTO);
    }

    public MyMovieDb getMovieDetail(int movieId) {
        return MyGenreList.getMovieWithGenre(tmdbApi.getMovies().getMovie(movieId, "ko-KR"));
    }
    public MovieDomain getMyMovieDetails(int movieId) {
        MovieEntity param = new MovieEntity();
        param.setId(movieId);
        return mapper.selTheMovie(param);
    }
    public List<Video> getMovieVideo(int movieId) {
        return tmdbApi.getMovies().getVideos(movieId, "ko-KR");
    }

    public List<MovieDomain> getMovieSearch(String searchText) {
        List<Integer> movieIds = MyGenreList.insMovieListAndGenres(tmdbApi.getSearch().searchMovie(searchText, null, "ko-KR", true, 1));
        return mapper.selSearchMovies(movieIds);
    }

    public List<HoverVO> selHover1(MovieFavEntity param) {
        List<HoverVO> selHover1 = mapper.selHover1(param);
        return selHover1;
    }
    public List<HoverVO> selHover2(MovieFavEntity param) {
        List<HoverVO> selHover2 = mapper.selHover2(param);
        return selHover2;
    }

}