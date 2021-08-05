package com.nurim.mvbunker.movies.model;

import lombok.Data;

@Data
public class MovieEntity {
    private int id;
    private String title;
    private String originalTitle;
    private String backdropPath;
    private String releaseDate;
    private boolean adult;
    private String overview;
    private String originalLanguage;
    private double popularity;
    private int mainGenre;
}
