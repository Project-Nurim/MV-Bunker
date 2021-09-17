// const orderbyElem = 정렬 요소 불러오기
const containerElem = document.querySelector('#wrapper');
const tableElem = document.querySelector('.reviewtable');

// 정렬버튼에 요소 이벤트 추가(클릭일지 체인지일지)
// orderbyElem.addEventListener('click', () => {
//     containerElem.innerHTML = '';
//     infinityScrolling.url = `/review/getAllReview?orderby=${}`;
//     infinityScrolling.getItemList(1);
// })

/* 인피니트 스크롤링 설정 */
const allReviewContainerElem = document.getElementById('allReviewContainer');
infinityScrolling.url = `/review/getAllReview?orderby=0`; // 요청보낼 url
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(result) { // 받은 애들 어떻게 뿌릴지
    const reviewList = result.selAllReview;
    console.log(reviewList);
    reviewList.forEach(review => {
        const ALLElem = document.createElement('figure');
        ALLElem.classList.add('ALL');
        const frameElem = document.createElement('div');
        frameElem.id = 'frame';
        const imgFrameElem = document.createElement('div');
        imgFrameElem.classList.add('img');
        imgFrameElem.addEventListener('click', (e) => {
            window.location.href = `/review/reviewDetail?movieId=${review.id}`;
        })
        const imgElem = document.createElement('img');
        imgElem.className = 'img2';
        imgElem.src = 'https://image.tmdb.org/t/p/w500/' + review.poster;
        const tableElem = document.createElement('ul');
        tableElem.classList.add('table');
        const unnLiElem = document.createElement('li');
        unnLiElem.innerText = `닉네임 : ${review.unn}`;
        const titleElem = document.createElement('li');
        titleElem.innerText = `영화 : ${review.title}`;
        const reviewCtntElem = document.createElement('li');
        reviewCtntElem.innerText = `리뷰 : ${review.re_ctnt}`
        const evalAvgElem = document.createElement('li');
        evalAvgElem.innerText = `평점 : ${review.totalAvg_review}`;
        tableElem.append(unnLiElem);
        tableElem.append(titleElem);
        tableElem.append(reviewCtntElem);
        tableElem.append(evalAvgElem);
        imgFrameElem.append(imgElem);
        frameElem.append(imgFrameElem);
        frameElem.append(tableElem);
        ALLElem.append(frameElem);
        allReviewContainerElem.append(ALLElem);
        // 컨테이너 주소 변수.innerHTML += `<div>${review.title}</div>`;
    })
}