// 로그인 안한사람인지
const isAnonymous = document.querySelector('.starRate').dataset.anonymous;
// 로그인 유저pk


// 유튜브 트레일러 뿌려주기
let videoKey = null;
if(document.querySelector('#video') != null) {
    videoKey = document.querySelector('#video').dataset.videoKey;
}
const movieIdVal = document.querySelector('#movieIdInput').value;
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        height: '430',
        width: '100%',
        playerVars: {'controls': 0 },
        videoId: videoKey
    });
}
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// 리뷰 CRUD 틀 (수정 필요 *******)
const reviewContainerElem = document.querySelector('#frame');
const reviewContainerElem2 = document.querySelector('.review-container');
const reviewWriteBtn = document.querySelector('.wBtn');
const movieTitleVal = document.querySelector('.square').dataset.movieTitle;
const moviePosterPath = document.querySelector('.square').dataset.moviePoster;
reviewWriteBtn.addEventListener('click',() => {
    const data = {
        id: movieIdVal,
        re_ctnt: document.querySelector('#test').value,
        title: movieTitleVal,
        poster: moviePosterPath
    }
    console.log(data.re_ctnt);
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
            console.log(review);
            reviewContainerElem2.prepend(makeJustReview(review));
            hideWriteBox();
        })
})
// 리뷰쓰는 텍스트 창 닫는 함수
function hideWriteBox() {
    document.querySelector('.square').classList.add('hide');
    document.querySelector('#test').classList.add('hide');
    document.querySelector('#test_cnt').classList.add('hide');
    document.querySelector('.r-button').classList.add('hide');
}
function showWriteBox() {
    document.querySelector('.square').classList.remove('hide');
    document.querySelector('#test').classList.remove('hide');
    document.querySelector('#test_cnt').classList.remove('hide');
    document.querySelector('.r-button').classList.remove('hide');
}
// 내가 쓴 리뷰 있는지 확인
function checkMyReview() {
    fetch(`/review/reviewRest/${movieIdVal}`)
        .then(res => res.json())
        .then(myJson => {
            if(myJson > 0) {
                hideWriteBox();
            }
        })
}
checkMyReview();








// 인피니티 스크롤링 설정
infinityScrolling.url = `/review/reviewDetailInfiniteScrolling?movieId=${movieIdVal}`; // 요청보낼 url
infinityScrolling.limit = 5;
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.getItemList(1);

function makeItemList(reviewList) { // 받은 애들 어떻게 뿌릴지
    console.log(reviewList);
    reviewList.forEach(review => {
        const reviewElem = makeJustReview(review);
        reviewContainerElem2.append(reviewElem);

       // 지민이가 만든 컨테이너 주소 변수.innerHTML += `<div>${review.title}</div>`;
    })
    if(infinityScrolling.limit === infinityScrolling.itemLength && infinityScrolling.currentPage === 1) {
        const moreReviewBtn = document.createElement('input');
        moreReviewBtn.type = 'button';
        moreReviewBtn.value = 'more';
        moreReviewBtn.className = 'input';
        reviewContainerElem2.append(moreReviewBtn);
        moreReviewBtn.addEventListener('click', e => {
            infinityScrolling.setScrollInfinity(window);
            infinityScrolling.getItemList(++infinityScrolling.currentPage);
            e.currentTarget.remove();
        })
    }
}
/* 바로 아래 얘나 그 밑에 주석되어 있는 애 아무거나 골라서 원하는 방식으로 작업해주면 댑니다.
    unn;    작성자 닉네임
    profileImg; 작정자 프로필사진
    review_like_cnt;    리뷰 좋아요 개수
    review_dislike_cnt; 리뷰 싫어요 개수
    review_cmt_cnt;     리뷰 댓글 개수
    totalAvg_Review;
    totalAvg_Movie;
    i_review;
    id;
    title;  영화 제목
    poster; 영화 포스터
    i_user;
    re_ctnt;    리뷰 내용
    regdt;  글쓴 일시

    둘다 review.변수명으로 내용 불러오면 댑니다.
    설명 적어놓은건 웬만하면 다 불러와질텐데.. 자세한 건 은영이에게 문의..
*  */
function makeJustReview(review) {
    const reviewFigure = document.createElement('figure');
    reviewFigure.className = 'review-figure';
    const userProfileDiv = document.createElement('div');
    userProfileDiv.classList.add('userProfileDiv');
    const userProfileImg = document.createElement('img');
    userProfileImg.src = review.profileImg;
    userProfileImg.classList.add('profileImg');

    const reviewTextBox = document.createElement('div');
    reviewTextBox.classList.add('reviewTextBox');
    const reviewTitle = document.createElement('h5');
    reviewTitle.classList.add('reviewTitle');
    reviewTitle.innerText = review.unn;
    const reviewCtnt = document.createElement('div');
    reviewCtnt.classList.add('reviewCtnt');
    reviewCtnt.innerText = review.re_ctnt;

    userProfileDiv.append(userProfileImg);
    reviewTextBox.append(reviewTitle);
    reviewTextBox.append(reviewCtnt);
    reviewFigure.append(userProfileDiv);
    reviewFigure.append(reviewTextBox);
    /* 삭제 버튼 */
    if(review.i_user === authUserPk) {
        const reviewDeleteBtnElem = document.createElement('input');
        reviewDeleteBtnElem.type = 'button';
        reviewDeleteBtnElem.value = '수정';
        reviewDeleteBtnElem.classList.add('myDelBtn');
        reviewDeleteBtnElem.addEventListener('click', (e) => {
            fetch(`/review/reviewRest/${review.i_review}`, {
                method: 'DELETE'
            }).then(response => response.json())
                .then(myJson => {
                    console.log(myJson);
                    if(myJson == 1) {
                        reviewFigure.remove();
                        document.getElementById('test').value = review.re_ctnt;
                        showWriteBox();
                    }else if(myJson == 0) {
                        alert('삭제 실패');
                    }
                })
        })
        reviewFigure.append(reviewDeleteBtnElem);
    }
    return reviewFigure;
}

/*function makeJustReview(review) {
    // 리뷰 화면에 그리기
    const reviewDivElem = document.createElement('div');
    reviewDivElem.innerHTML =
    `<div class="picc">
        <div class="a">
            <img class="com" th:src="${review.profileImg}">
                <p>${review.re_ctnt}</p>
        </div>
    </div>`
    reviewContainerElem.append(reviewDivElem);
}*/


$( document ).ready(function() {
    $('.trigger').on('click', function() {
        if(isAnonymous) {
            alert('로그인이 필요합니다.');
            return false;
        }
        $('.modal-wrapper').toggleClass('open');
        $('.page-wrapper').toggleClass('blur-it');
        return false;
    });
});

/*---------------- 별점 배경 -----------*/
const starRateContainerElem = document.querySelector('.starRate');
if(starRateContainerElem.dataset.backDropImg != null) {
    starRateContainerElem.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${starRateContainerElem.dataset.backDropImg})`;
    starRateContainerElem.style.backgroundSize = '100% auto';
    // starRateContainerElem.style.zIndex = ;
}

/*---------------- 별점 --------------------*/
const totalRatingInputElem = document.querySelectorAll('.eval__radio');
const emptyStarElem = document.getElementById('star');
const fullStarElem = document.getElementById('starr');
let checked = false;

totalRatingInputElem.forEach(radioBtn => {
    radioBtn.addEventListener('click', (e) => {
        const evalCode = e.currentTarget.name;
        const evalScore = e.currentTarget.value;
        console.log(evalCode, evalScore);
        const data = {
            production: null,
            performance: null,
            visual_beauty: null,
            music: null,
            plot: null,
            id: movieIdVal
        };
        switch (evalCode) {
            case "rating":
                data.performance = Number(evalScore);
                break;
            case "rating2":
                data.production = Number(evalScore);
                break;
            case "rating3":
                data.visual_beauty = Number(evalScore);
                break;
            case "rating4":
                data.music = Number(evalScore);
                break;
            case "rating5":
                data.plot = Number(evalScore);
        }
        fetch('/review/evalRest', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(myJson => {
                if(myJson.working) {
                    checkEval(movieIdVal);
                }else {
                    alert('별점 평가 실패. 오류 발생');
                }
            })
    })
})
const productionStarElem = document.getElementById('productionStar');
const performanceStarElem = document.getElementById('performanceStar');
const visual_beautyStarElem = document.getElementById('visual_beautyStar');
const musicStarElem = document.getElementById('musicStar');
const plotStarElem = document.getElementById('plotStar');
const productionStarScoreElem = document.getElementById('productionStarScore');
const performanceStarScoreElem = document.getElementById('performanceStarScore');
const visual_beautyStarScoreElem = document.getElementById('visual_beautyStarScore');
const musicStarScoreElem = document.getElementById('musicStarScore');
const plotStarScoreElem = document.getElementById('plotStarScore');
function checkEval(movieId) {
    fetch(`/review/getCheckEval?id=${movieId}`)
        .then(res => res.json())
        .then(myJson => {
            if(myJson.myEval != null) {
                fullStarElem.style.display = "block";
                emptyStarElem.style.display = "none";
                if(document.getElementById(`star${myJson.myEval.performance}`) != null) {
                    document.getElementById(`star${myJson.myEval.performance}`).checked = true;
                }
                if(document.getElementById(`star${myJson.myEval.production}2`) != null) {
                    document.getElementById(`star${myJson.myEval.production}2`).checked = true;
                }
                if(document.getElementById(`star${myJson.myEval.visual_beauty}3`) != null) {
                    document.getElementById(`star${myJson.myEval.visual_beauty}3`).checked = true;
                }
                if(document.getElementById(`star${myJson.myEval.music}4`) != null) {
                    document.getElementById(`star${myJson.myEval.music}4`).checked = true;
                }
                if(document.getElementById(`star${myJson.myEval.plot}5`) != null) {
                    document.getElementById(`star${myJson.myEval.plot}5`).checked = true;
                }
                getMovieEvalAvg(movieId);
            }
        })

}
function getMovieEvalAvg(movieId) {
    fetch(`/review/getMovieEvalAvg?id=${movieId}`)
        .then(res => res.json())
        .then(myJson => {
            performanceStarElem.style.width = myJson.movieEval.performance/5 * 100 + '%';
            performanceStarScoreElem.innerText = myJson.movieEval.performance.toFixed(1) + '/5';
            productionStarElem.style.width = myJson.movieEval.production/5 * 100 + '%';
            productionStarScoreElem.innerText = myJson.movieEval.production.toFixed(1) + '/5';
            visual_beautyStarElem.style.width = myJson.movieEval.visual_beauty/5 * 100 + '%';
            visual_beautyStarScoreElem.innerText = myJson.movieEval.visual_beauty.toFixed(1) + '/5';
            musicStarElem.style.width = myJson.movieEval.music/5 * 100 + '%';
            musicStarScoreElem.innerText = myJson.movieEval.music.toFixed(1) + '/5';
            plotStarElem.style.width = myJson.movieEval.plot/5 * 100 + '%';
            plotStarScoreElem.innerText = myJson.movieEval.plot.toFixed(1) + '/5';
        })
}
if(isAnonymous) {
    getMovieEvalAvg(movieIdVal);
}else {
    checkEval(movieIdVal);
}


/*--------- 영화 좋아요 ----------*/
const heart = document.getElementById("ht");
const heartt = document.getElementById("htt");

heart.addEventListener('click',function(){
    if(isAnonymous) {
        alert('로그인이 필요합니다.');
    }else {
        movieFavProc.method = 'POST';
        movieFavProc.doFavMovie();
    }
})

heartt.addEventListener('click',function(){
    movieFavProc.method = 'DELETE';
    movieFavProc.unDoFavMovie();
})




$(document).ready(function() {
    $('#test').on('keyup', function() {
        $('#test_cnt').html("("+$(this).val().length+" / 100)");

        if($(this).val().length > 100) {
            $(this).val($(this).val().substring(0, 100));
            $('#test_cnt').html("(100 / 100)");
        }
    });
});

const movieFavProc = {
    method: '',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    data: {
        id: movieIdVal
    },
    doFavMovie: function () {
        fetch('/review/favMovie', {
            method: this.method,
            body: JSON.stringify(this.data),
            headers: this.headers,
        }).then(res => res.json())
            .then(myJson => {
                if(myJson === 1) {
                    checkFav();
                }else {
                    alert('좋아요 실패. 오류 발생.');
                }
            })
    },
    unDoFavMovie: function () {
        fetch(`/review/favMovie/${movieIdVal}`, {
            method: this.method
        }).then(res => res.json())
            .then(myJson => {
                if(myJson === 1) {
                    checkFav();
                }else {
                    alert('좋야요 취소 실패. 오류 발생.');
                }
            })
    }
}
function checkFav() {
    fetch(`/review/favMovie/${movieIdVal}`, {method: 'GET'})
        .then(res => res.json())
        .then(myJson => {
            if(myJson === 1) {
                heart.style.display = 'none';
                heartt.style.display = 'block';
            }else {
                heart.style.display ='block';
                heartt.style.display = 'none';
            }
        })
}
if(!isAnonymous) {
    checkFav();
}

//------------------댓글




