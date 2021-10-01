// const orderbyElem = 정렬 요소 불러오기
const containerElem = document.querySelector('#wrapper');
const tableElem = document.querySelector('.reviewtable');
const sectionElem = document.querySelector('#allReviewContainer');

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
    const p2Elem = document.createElement('div');
    p2Elem.classList.add('p2');
    const ptagElem = document.createElement('p');
    ptagElem.innerText = `내가 찜한 영화`
    const reviewList = result.selAllReview;
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
        if(review.profileImg == null){
            review.profileImg == '/img/noprofile.png';
        }
        profileimgElem.src= `${review.profileImg}`;
        const userElem = document.createElement('span');
        userElem.className = 'user';
        userElem.innerText = `닉네임 : ${review.unn}` | `작성일 : ${review.regdt}`;
        const br2Elem = document.createElement('br');
        const starElem = document.createElement('div');
        starElem.classList.add('star');
        starElem.innerText = `평점 : ${review.totalAvg_Review}`;
        const writeElem = document.createElement('div');
        writeElem.innerText = `리뷰 : ${review.re_ctnt}`

        p2Elem.append(ptagElem);
        oneposterElem.append(divtag1Elem);
        divtag1Elem.append(posterimgElem);
        oneposterElem.append(br1Elem);
        onereviewElem.append(personalElem);
        personalElem.append(profileimgElem);
        personalElem.append(userElem);
        personalElem.append(br2Elem);
        personalElem.append(starElem);
        onereviewElem.append(writeElem);

        sectionElem.append(p2Elem);
        sectionElem.append(oneposterElem);
        sectionElem.append(onereviewElem);
        sectionElem.append(personalElem);


        // imgFrameElem.addEventListener('click', (e) => {
        //     window.location.href = `/review/reviewDetail?movieId=${review.id}`;
        // })
        // const imgElem = document.createElement('img');
        // imgElem.className = 'img2';
        // imgElem.src = 'https://image.tmdb.org/t/p/w500/' + review.poster;
        // const tableElem = document.createElement('ul');
        // tableElem.classList.add('table');
        // const unnLiElem = document.createElement('li');
        // unnLiElem.innerText = `닉네임 : ${review.unn}`;
        // const titleElem = document.createElement('li');
        // titleElem.innerText = `영화 : ${review.title}`;
        // const reviewCtntElem = document.createElement('li');
        // reviewCtntElem.innerText = `리뷰 : ${review.re_ctnt}`
        // const evalAvgElem = document.createElement('li');
        // evalAvgElem.innerText = `평점 : ${review.totalAvg_Review}`;
        // tableElem.append(unnLiElem);
        // tableElem.append(titleElem);
        // tableElem.append(reviewCtntElem);
        // tableElem.append(evalAvgElem);
        // imgFrameElem.append(imgElem);
        // frameElem.append(imgFrameElem);
        // frameElem.append(tableElem);
        // ALLElem.append(frameElem);
        // allReviewContainerElem.append(ALLElem);
        // 컨테이너 주소 변수.innerHTML += `<div>${review.title}</div>`;
    })
}