package com.nurim.mvbunker.movies.model;

import lombok.Data;

@Data
public class MovieDomain extends MovieEntity {
    private int production;
    private int performance;
    private int visual_beauty;
    private int music;
    private int plot;
}
