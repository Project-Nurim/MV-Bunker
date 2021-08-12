package com.nurim.mvbunker.common.model;

import lombok.Data;

@Data
public class PagingDTO {
    private int page;
    private int listLength = 10;
    private int minIndex;
    private int orderby;
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
