package com.nurim.mvbunker.review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("review")
public class ReviewController {
    @Autowired
    private ReviewService service;

    @GetMapping("/review")
    public void review(){}

    @GetMapping("/reviewDetail")
    public void reviewDetail(){}

}
