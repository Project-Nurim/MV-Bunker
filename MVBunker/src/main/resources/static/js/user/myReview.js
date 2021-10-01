// infinityScrolling.url = `/user/getReviewInfinite?i_user=0`; // 요청보낼 url
// infinityScrolling.makeItemList = makeItemList;
// infinityScrolling.setScrollInfinity(window);
// infinityScrolling.getItemList(1);
// function makeItemList(reviewList) {
//     reviewList.forEach(function(review) {
//         const poster = document.createElement('img');
//         poster.src = 'https://image.tmdb.org/t/p/w500/' + review.poster;
//     })
// }
//

// const orderbyElem = 정렬 요소 불러오기
// const containerElem = document.querySelector('#wrapper');
// const tableElem = document.querySelector('.reviewtable');
const sectionElem = document.querySelector('#allReviewContainer');

/* 인피니트 스크롤링 설정 */
// const allReviewContainerElem = document.getElementById('allReviewContainer');
infinityScrolling.url = `/review/getAllReview?orderby=0`; // 요청보낼 url
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(reviewList) { // 받은 애들 어떻게 뿌릴지
    reviewList.forEach(function(review){
    console.log('reviewList = ' + reviewList);
    reviewList.forEach(review => {
        const oneposterElem = document.createElement('div');
        oneposterElem.classList.add('oneposter');
        const divtag1Elem = document.createElement('div');
        const posterimgElem = document.createElement('img');
        posterimgElem.className = 'posterimg';
        posterimgElem.src = 'https://image.tmdb.org/t/p/w500/' + review.poster;
        const onereviewElem = document.createElement('div');
        onereviewElem.classList.add('onereview');
        const br1Elem = document.createElement('br');
        const personalElem = document.createElement('div');
        personalElem.classList.add('personal');
        const profileimgElem = document.createElement('img');
        profileimgElem.className = 'profileimg';
        if (review.profileImg == null) {
            review.profileImg == '/img/noprofile.png';
        }
        profileimgElem.src = `${review.profileImg}`;
        const userElem = document.createElement('span');
        userElem.className = 'user';
        userElem.innerText = `닉네임 : ${auth.unn}` | `작성일 : ${review.regdt}`;
        const br2Elem = document.createElement('br');
        const starElem = document.createElement('div');
        starElem.classList.add('star');
        starElem.innerText = `평점 : ${review.totalAvg_Review}`;
        const writeElem = document.createElement('div');
        writeElem.innerText = `리뷰 : ${review.re_ctnt}`

        oneposterElem.append(divtag1Elem);
        divtag1Elem.append(posterimgElem);
        oneposterElem.append(br1Elem);
        onereviewElem.append(personalElem);
        personalElem.append(profileimgElem);
        personalElem.append(userElem);
        personalElem.append(br2Elem);
        personalElem.append(starElem);
        onereviewElem.append(writeElem);

        sectionElem.append(oneposterElem);
        sectionElem.append(onereviewElem);
        sectionElem.append(personalElem);
    })
    })
}