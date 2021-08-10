package com.nurim.mvbunker.movies;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nurim.mvbunker.movies.model.GenreEntity;
import info.movito.themoviedbapi.TmdbApi;
import info.movito.themoviedbapi.model.core.MovieResultsPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.Charset;
import java.util.List;

@Service
public class MyTmdbApi {

    private String api_key = "6956427bb4a25b1080cb617aa6e2194e";

    private String baseUrl = "https://api.themoviedb.org/3/";

    public <T> T getRestApi(UriComponents builder, Class<T> valueType) {

        RestTemplate rest = new RestTemplate();
        rest.getMessageConverters().add(0, new StringHttpMessageConverter(Charset.forName("UTF-8")));
        ResponseEntity<String> responseEntity = rest.exchange(builder.toUriString(), HttpMethod.GET, null, String.class);

        String result = responseEntity.getBody();

        ObjectMapper om = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        JsonNode jsonNode = null;
        try {
            jsonNode = om.readTree(result);
            return om.treeToValue(jsonNode, valueType);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /* sort_by 파라미터 옵션
    popularity.asc
    popularity.desc, (기본값)
    release_date.asc,
    release_date.desc,
    revenue.asc,
    revenue.desc,
    primary_release_date.asc,
    primary_release_date.desc,
    original_title.asc,
    original_title.desc,
    vote_average.asc,
    vote_average.desc,
    vote_count.asc,
    vote_count.desc
    * */
    /* 장르코드
    액션	28
    모험	12
    애니메이션	16
    코미디	35
    범죄	80
    다큐멘터리	99
    드라마	18
    가족	10751
    판타지	14
    역사	34
    공포	27
    음악	10402
    미스터리	9648
    로맨스	10749
    SF	878
    TV 영화	10770
    스릴러	53
    전쟁	10752
    서부	37
    */
    public MovieResultsPage getMoviesWithGenre(int genreId) {
        String url = baseUrl + "discover/movie";
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", api_key)
                .queryParam("with_genres", genreId)
                .queryParam("language", "ko")
                .build();

        MovieResultsPage mrp = getRestApi(builder, MovieResultsPage.class);
        return mrp;
    }

    public MovieResultsPage getMoviesWithGenre(int genreId, int page) {
        String url = baseUrl + "discover/movie";
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", api_key)
                .queryParam("with_genres", genreId)
                .queryParam("page", page)
                .queryParam("language", "ko")
                .build();

        return getRestApi(builder, MovieResultsPage.class);
    }

    public List<GenreEntity> getOriginGenreList() {
        String url = baseUrl + "genre/movie/list";
        UriComponents builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("api_key", api_key)
                .queryParam("language", "en")
                .build();

        List<GenreEntity> result = getRestApi(builder, List.class);
        return result;
    }
}
