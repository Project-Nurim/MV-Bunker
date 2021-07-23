package com.nurim.mvbunker.movies.model;

import info.movito.themoviedbapi.model.MovieDb;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
public class MyMovieDb extends MovieDb {
    @Autowired private GenreLists genreLists;

    private List<String> GenreNames;

    // 오버라이드 해버리기.. API 에서 불러오자마자 걍 넣어버리기...
    /*@Override
    public void setGenres(List<Integer> genres) {
        List<String> list = new ArrayList<>();
        for (Integer genreId : genres){
            list.add(genreLists.getGenreMap().get(genreId));
        }
        GenreNames = list;
    }*/
}
