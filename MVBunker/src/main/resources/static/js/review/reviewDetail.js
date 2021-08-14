// 유튜브 트레일러 뿌려주기
const videoKey = document.querySelector('#video').dataset.videoKey;
const movieIdVal = document.querySelector('#movieIdInput').value;
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        height: '360',
        width: '640',
        playerVars: {'controls': 0 },
        videoId: videoKey
    });
}
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// 리뷰 CRUD 틀 (수정 필요 *******)
/*
리뷰 쓰기 버튼Elem.addEventListener('click',() => {
    const data = {
        // id: 영화 아이디값
        // re_ctnt: 리뷰 쓴 내용 값
        // title: 영화 제목값
        // poster: 영화 포스터 값
    }
    const init = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }
    fetch('/review/reviewRest', init)
        .then(res => res.json())
        .then(review => {
            makeJustReview(review);
        })
})

리뷰 수정완료 버튼Elem.addEventListener('click',() => {
    //수정 버튼 누르면 내가 썼던 리뷰 화면에서 지우면서 input 창에 re_ctnt 넣어서 만들어주기
    const data = {
        // id: 영화 아이디값
        // re_ctnt: 리뷰 쓴 내용 값
    }
    const init = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }
    fetch('/review/reviewRest', init)
        .then(res => res.json())
        .then(review => {
            makeJustReview(review);
        })
})
*/
function makeJustReview(review) {
    // 리뷰 화면에 그리기
}



/* 별점 */
const EvalContainerElem = document.querySelector('#all');
const fieldSetElems = EvalContainerElem.querySelectorAll('.eval');

fieldSetElems.forEach((fieldSetElem) => {
    fieldSetElem.addEventListener('change', (e) => {
        console.log(e.currentTarget);
    })
})


// 인피니티 스크롤링 설정
infinityScrolling.url = `/review/getAllReview?orderby=0&movieId=${movieIdVal}`; // 요청보낼 url
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(reviewList) { // 받은 애들 어떻게 뿌릴지
    console.log(reviewList);
    reviewList.forEach(review => {
        makeJustReview(review);
       // 지민이가 만든 컨테이너 주소 변수.innerHTML += `<div>${review.title}</div>`;
    })
}