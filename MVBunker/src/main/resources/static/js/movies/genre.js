var slideIndex = 0; //slide index
var slideIndex2 = 0;
var slideIndex3 = 0;
var slideIndex4 = 0;

const eachGenreList = document.querySelectorAll('.each-genre');

eachGenreList.forEach((articleElem) => {
    const dataset = articleElem.dataset;
    const prevBtnElem = articleElem.querySelector('.prev');
    const nextBtnElem = articleElem.querySelector('.next');
    prevBtnElem.addEventListener('click', () => {
        dataset.slideIndex = String(Number(dataset.slideIndex) + 1);
        showSlides(1, articleElem);
    })
    nextBtnElem.addEventListener('click', () => {
        dataset.slideIndex = String(Number(dataset.slideIndex) + 1);
        showSlides(1, articleElem);
    })
    showSlides(0, articleElem);
})



function showSlides(n, articleElement) {
    const dataset = articleElement.dataset;
    const slides = articleElement.getElementsByClassName("mySlides");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    let result = Number(dataset.slideIndex)%2;
    slides[result].style.display = "block";
}

function show(){
    const img = document.querySelector(".x");
    img.setStyle()
}


darknessEfx();



var topBtn = document.getElementById('back-to-top'),
    docElem = document.documentElement,
    offset,
    scrollPos,
    docHeight;

// 문서의 높이 계산
docHeight = docElem.scrollHeight;
//console.log(docHeight);
if (docHeight != 0) {
    offset = docHeight / 4;
}

//스크롤이벤트 추가
window.addEventListener('scroll', function () {
    scrollPos = docElem.scrollTop;
    //console.log(scrollPos);
    if (scrollPos > offset) {
        topBtn.className = 'visible';
    } else {
        topBtn.className = '';

    }
})


