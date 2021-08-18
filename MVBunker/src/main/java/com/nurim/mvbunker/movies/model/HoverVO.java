package com.nurim.mvbunker.movies.model;

import lombok.Data;

@Data
public class HoverVO extends MovieEntity{
    private int mF_exist;
    private int R_exist;
    private double totalAvg_Movie;
    private double totalAvg_Review;
}
