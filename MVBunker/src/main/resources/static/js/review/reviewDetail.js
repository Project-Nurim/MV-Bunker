// 로그인 안한사람인지
const isAnonymous = document.querySelector('.starRate').dataset.anonymous;
// 유튜브 트레일러 뿌려주기
const videoKey = document.querySelector('#video').dataset.videoKey;
const movieIdVal = document.querySelector('#movieIdInput').value;
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        height: '430',
        width: '1000',
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
    const allElem = document.createElement('div');
    allElem.classList.add('all');
    const containerElem = document.createElement('div');
    containerElem.classList.add('container');
    const ratingElem = document.createElement('div');
    ratingElem.classList.add('rating-wrap');
    const h5 = document.createElement('h5');
    const centerElem= document.createElement('div');
    centerElem.classList.add('center');
    const evalElem = document.createElement(('fieldse'));
    evalElem.classList.add('rating eval');

}





// 인피니티 스크롤링 설정
infinityScrolling.url = `/review/reviewDetailInfiniteScrolling?movieId=${movieIdVal}`; // 요청보낼 url
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
// totalRatingInputElem.forEach((ratingElem) => {
//     ratingElem.addEventListener('click', (e) => {
//         const evalue = e.currentTarget.value;
//         const evalCode = e.currentTarget.name;
//         const data = {
//             id: movieIdVal,
//             evalue: evalue,
//             evalCode: evalCode
//         }
//         const init = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8'
//             },
//             body: JSON.stringify(data)
//         }
//     })
// })
// if (checked) {
//     document.getElementById("starr").style.display = "block";
// }
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
                document.getElementById(`star${myJson.myEval.performance}`).checked = true;
                document.getElementById(`star${myJson.myEval.production}2`).checked = true;
                document.getElementById(`star${myJson.myEval.visual_beauty}3`).checked = true;
                document.getElementById(`star${myJson.myEval.music}4`).checked = true;
                document.getElementById(`star${myJson.myEval.plot}5`).checked = true;
                getMovieEvalAvg(movieId);
            }
        })

}
function getMovieEvalAvg(movieId) {
    fetch(`/review/getMovieEvalAvg?id=${movieId}`)
        .then(res => res.json())
        .then(myJson => {
            performanceStarElem.style.width = myJson.movieEval.performance/5 * 100 + '%';
            performanceStarScoreElem.innerText = myJson.movieEval.performance + '/5';
            productionStarElem.style.width = myJson.movieEval.production/5 * 100 + '%';
            productionStarScoreElem.innerText = myJson.movieEval.production + '/5';
            visual_beautyStarElem.style.width = myJson.movieEval.visual_beauty/5 * 100 + '%';
            visual_beautyStarScoreElem.innerText = myJson.movieEval.visual_beauty + '/5';
            musicStarElem.style.width = myJson.movieEval.music/5 * 100 + '%';
            musicStarScoreElem.innerText = myJson.movieEval.music + '/5';
            plotStarElem.style.width = myJson.movieEval.plot/5 * 100 + '%';
            plotStarScoreElem.innerText = myJson.movieEval.plot + '/5';
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
