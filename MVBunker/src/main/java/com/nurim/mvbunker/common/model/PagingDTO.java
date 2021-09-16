package com.nurim.mvbunker.common.model;

import lombok.Data;

@Data
public class PagingDTO {
    private int page;
    private int listLength = 10;
    private int minIndex; //몇 번째 레코드부터 시작하는지! 시작하는 위치의 인덱스 값
    private int orderby;
    private String searchText;
    public PagingDTO(int page) {
        this.page = page;
        this.minIndex = (page - 1) * listLength;
    }
    public PagingDTO(int page, int orderby) {
        this.page = page;
        this.orderby = orderby;
        this.minIndex = page * listLength - listLength;
    }
    public PagingDTO(int page, int orderby, int listLength) {
        this.page = page;
        this.orderby = orderby;
        this.minIndex = page * listLength - listLength;
        this.listLength = listLength;
    }
}
