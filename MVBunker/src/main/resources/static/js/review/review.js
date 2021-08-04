// const orderbyElem = 정렬 요소 불러오기
const containerElem = document.querySelector('#wrapper');

// 정렬버튼에 요소 이벤트 추가(클릭일지 체인지일지)
// orderbyElem.addEventListener('click', () => {
//     containerElem.innerHTML = '';
//     infinityScrolling.url = `/review/getAllReview?orderby=${}`;
//     infinityScrolling.getItemList(1);
// })

/* 인피니트 스크롤링 설정 */
// infinityScrolling.url = `/review/getAllReview?orderby=${}`; // 요청보낼 url
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(reviewList) { // 받은 애들 어떻게 뿌릴지
    console.log(reviewList);
    reviewList.forEach(review => {


        // 지민이가 만든 컨테이너 주소 변수.innerHTML += `<div>${review.title}</div>`;
    })
}