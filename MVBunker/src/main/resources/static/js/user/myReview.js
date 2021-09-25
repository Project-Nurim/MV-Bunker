infinityScrolling.url = `/user/getReviewInfinite?i_user=0`; // 요청보낼 url
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(reviewList) {
    reviewList.forEach(function(review) {
        const poster = document.createElement('img');
        poster.src = 'https://image.tmdb.org/t/p/w500/' + review.poster;
    })
}