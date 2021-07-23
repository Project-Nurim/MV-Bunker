package com.nurim.mvbunker.movies;



import info.movito.themoviedbapi.model.MovieDb;
import org.springframework.stereotype.Component;

import java.util.Comparator;

@Component
public class MiniComparator
 implements Comparator<MovieDb> {
    @Override
    public int compare(MovieDb mv1, MovieDb mv2) {
        float firstVal = mv1.getPopularity();
        float secondVal = mv2.getPopularity();
        if(firstVal > secondVal) {
            return -1;
        }else if(secondVal > firstVal) {
            return 1;
        }else {
            return 0;
        }
    }
}
