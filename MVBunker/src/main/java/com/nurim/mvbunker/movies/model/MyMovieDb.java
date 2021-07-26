package com.nurim.mvbunker.movies.model;

import info.movito.themoviedbapi.model.*;
import info.movito.themoviedbapi.model.keywords.Keyword;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyMovieDb extends MovieDb {

    private List<String> genreNames;

    private List<Artwork> images;

    private List<AlternativeTitle> alternativeTitles;

    private  List<Keyword> keywords;

    private List<ReleaseInfo> releases;

    private List<Video> videos;

    private List<Translation> translations;

    private List<MovieDb> similarMovies;

    private List<MovieDb> recommendedMovies;

    private List<MovieList> lists;

    private List<Reviews> reviews;

    public MyMovieDb(MovieDb origin) {
        this.setTitle(origin.getTitle());
        this.setOriginalTitle(origin.getOriginalTitle());
        this.setPopularity(origin.getPopularity());
        this.setBackdropPath(origin.getBackdropPath());
        this.setPosterPath(origin.getPosterPath());
        this.setReleaseDate(origin.getReleaseDate());
        this.setAdult(origin.isAdult());
        this.setBelongsToCollection(origin.getBelongsToCollection());
        this.setBudget(origin.getBudget());
        this.setGenres(origin.getGenres());
        this.setHomepage(origin.getHomepage());
        this.setOverview(origin.getOverview());
        this.setImdbID(origin.getImdbID());
        this.setOriginalLanguage(origin.getOriginalLanguage());
        this.setProductionCompanies(origin.getProductionCompanies());
        this.setProductionCountries(origin.getProductionCountries());
        this.setRevenue(origin.getRevenue());
        this.setRuntime(origin.getRuntime());
        this.setSpokenLanguages(origin.getSpokenLanguages());
        this.setTagline(origin.getTagline());
        this.setUserRating(origin.getUserRating());
        this.setVoteAverage(origin.getVoteAverage());
        this.setVoteCount(origin.getVoteCount());
        this.setStatus(origin.getStatus());
        this.setAlternativeTitles(origin.getAlternativeTitles());
        this.setCredits(origin.getCredits());
        this.setImages(origin.getImages());
        this.setKeywords(origin.getKeywords());
        this.setReleases(origin.getReleases());
        this.setVideos(origin.getVideos());
        this.setTranslations(origin.getTranslations());
        this.setSimilarMovies(origin.getSimilarMovies());
        this.setRecommendedMovies(origin.getRecommendations());
        this.setReviews(origin.getReviews());
        this.setLists(origin.getLists());
        this.setGenreNames(new ArrayList<>());
    }

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
