var slideIndex = 0; //slide index
var slideIndex2 = 0;
var slideIndex3 = 0;
var slideIndex4 = 0;

// HTML 로드가 끝난 후 동작
window.onload=function(){
    showSlides(slideIndex);
    showSlides2(slideIndex2)
    showSlides3(slideIndex3)
    showSlides4(slideIndex4)
}


// Next/previous controls
function moveSlides(n) {
    slideIndex = slideIndex + n
    showSlides(slideIndex);
}



function moveSlides2(n2) {
    slideIndex2 = slideIndex2 + n2
    showSlides2(slideIndex2);
}

function moveSlides3(n3) {
    slideIndex3 = slideIndex3 + n3
    showSlides3(slideIndex3);
}

function moveSlides4(n4) {
    slideIndex4 = slideIndex4 + n4
    showSlides4(slideIndex4);
}

function showSlides(n) {

    var slides = document.getElementsByClassName("mySlides");
    var size = slides.length;

    if ((n+1) > size) {
        slideIndex = 0; n = 0;
    }else if (n < 0) {
        slideIndex = (size-1);
        n = (size-1);
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[n].style.display = "block";
}




function showSlides2(n2) {

    var slides2 = document.getElementsByClassName("mySlides2");
    var size2 = slides2.length;

    if ((n2+1) > size2) {
        slideIndex2 = 0; n2 = 0;
    }else if (n2 < 0) {
        slideIndex2 = (size2-1);
        n2 = (size2-1);
    }

    for (i = 0; i < slides2.length; i++) {
        slides2[i].style.display = "none";
    }

    slides2[n2].style.display = "block";
}

function showSlides3(n3) {

    var slides3 = document.getElementsByClassName("mySlides3");
    var size3 = slides3.length;

    if ((n3+1) > size3) {
        slideIndex3 = 0; n3 = 0;
    }else if (n3 < 0) {
        slideIndex3 = (size3-1);
        n3 = (size3-1);
    }

    for (i = 0; i < slides3.length; i++) {
        slides3[i].style.display = "none";
    }

    slides3[n3].style.display = "block";
}

function showSlides4(n4) {

    var slides4 = document.getElementsByClassName("mySlides4");
    var size4 = slides4.length;

    if ((n4+1) > size4) {
        slideIndex4 = 0; n4 = 0;
    }else if (n4 < 0) {
        slideIndex4 = (size4-1);
        n4 = (size4-1);
    }

    for (i = 0; i < slides4.length; i++) {
        slides4[i].style.display = "none";
    }

    slides4[n4].style.display = "block";
}