package com.nurim.mvbunker;

import com.nurim.mvbunker.movies.MyTmdbApi;
import com.nurim.mvbunker.movies.model.GenreEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@SpringBootTest
class MvBunkerApplicationTests {

    @Autowired private MyTmdbApi myTmdbApi;


    @Test
    public void getOriginGenreList() {
        String url = "https://api.themoviedb.org/3/" + "genre/movie/list";
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", "6956427bb4a25b1080cb617aa6e2194e")
                .queryParam("language", "en")
                .build();

        List<GenreEntity> result = myTmdbApi.getRestApi(builder, List.class);
        for(GenreEntity entity : result) {
            System.out.println(entity);
        }
    }



}
