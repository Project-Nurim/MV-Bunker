package com.nurim.mvbunker.movies.model;

import lombok.Data;

@Data
public class HoverEntity extends MovieEntity{
    private int mF_exist;
    private int R_exist;
    private double totalAvg_Movie;
}
