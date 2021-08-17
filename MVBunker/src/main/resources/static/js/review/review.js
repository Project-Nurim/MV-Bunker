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
        // 지민이가 만든 컨테이너 주소 변수.innerHTML += `<div>${review.title}</div>`;
    })
}


//html파일
var nav = $('nav');
var line = $('<div>').addClass('line'); //.addclass()로 선택한 요소에 클래스값을 추가할수 있다.

line.appendTo(nav); //선택한 요소를 다른 요소 안에 넣는다.
//ex)$('p').appendTo('blockquote');는 p요소를 blockquote 요소 안으로 이동시킨다.
//ex)$('span.abc').appendTo('h1');
var active = nav.find('.active'); // 어떤 요소의 하위 요소 중 특정 요소를 찾을 때 사용
// nav 요소의 하위 요소 중 .active요소를 선택
var pos = 0;
var wid = 0;

if (active.length) {
    pos = active.position().left;
    wid = active.width();
    line.css({
        left: pos,
        width: wid
    });
}
//-----------------------------단어길이를 기준으로 시작점과 가로길이 정한듯
nav.find('ul li a').hover(function (e) {
    e.preventDefault();
    if (!$(this).parent().hasClass('active') && !nav.hasClass('animate')) {
        //.parent()는 어떤 요소의 부모요소를 선택함
        //.hasClass()는 선택한 요소에 클래스가 있는지 확인한다.
        nav.addClass('animate');

        var _this = $(this);

        nav.find('ul li').removeClass('active');

        var position = _this.parent().position();
        var width = _this.parent().width();

        if (position.left >= pos) {
            line.animate({
                width: ((position.left - pos) + width)
            }, 200, function () {
                line.animate({
                    width: width,
                    left: position.left
                }, 150, function () {
                    nav.removeClass('animate');
                });
                _this.parent().addClass('active');
            });
        } else {
            line.animate({
                left: position.left,
                width: ((pos - position.left) + wid)
            }, 200, function () {
                line.animate({
                    width: width
                }, 150, function () {
                    nav.removeClass('animate');
                });
                _this.parent().addClass('active');
            });
        }

        pos = position.left;
        wid = width;
    }
});