// const orderbyElem = 정렬 요소 불러오기
const containerElem = document.querySelector('#wrapper');
const tableElem = document.querySelector('#reviewTable');

// 정렬버튼에 요소 이벤트 추가(클릭일지 체인지일지)
// orderbyElem.addEventListener('click', () => {
//     containerElem.innerHTML = '';
//     infinityScrolling.url = `/review/getAllReview?orderby=${}`;
//     infinityScrolling.getItemList(1);
// })

/* 인피니트 스크롤링 설정 */
infinityScrolling.url = `/review/getAllReview?orderby=0`; // 요청보낼 url
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(reviewList) { // 받은 애들 어떻게 뿌릴지
    console.log(reviewList);
    reviewList.forEach(review => {
        const trElem1 = document.createElement('tr');
        const tdElem1 = document.createElement('td');
        const tdElem2 = document.createElement('td');
        const imgElem = document.createElement('img');
        imgElem.src = review.poster;
        imgElem.ClassName = '클래스';

        tdElem1.append(imgElem);
        trElem1.append(tdElem1);
        trElem1.append(tdElem2);
        tableElem.append(trElem1);
        // tableElem.append(trElem2);


        // 지민이가 만든 컨테이너 주소 변수.innerHTML += `<div>${review.title}</div>`;
    })
}