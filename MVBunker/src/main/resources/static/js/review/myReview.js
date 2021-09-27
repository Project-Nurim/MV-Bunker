
// infinite Scrolling 부분이올시다
const reviewContainerElem = document.querySelector('#reviewContainer');
// const orderby = document.querySelector('오더바이의 쿼리셀레터값').밸류나 데이터셋이나 뭐시기
infinityScrolling.url = `/user/getReviewInfinite?order=${orderby}`;
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.limit = 10;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(reviewList) {
    reviewList.forEach(function (review) {
        // 리뷰 어떻게 그려넣을지~~



        reviewContainerElem.append();
    })
}