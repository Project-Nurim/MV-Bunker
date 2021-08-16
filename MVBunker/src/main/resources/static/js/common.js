
const infinityScrolling = {
    limit: 20,
    itemLength: 0,
    currentPage: 1,
    url: '',
    orderby: 0,
    makeItemList: function () {},
    setScrollInfinity: function(target) {
        target.addEventListener('scroll', () => {
            const {
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 5 && this.itemLength === this.limit) {
                this.itemLength = 0;
                this.getItemList(++this.currentPage);
            }
        }, { passive: true });
    },
    getItemList: function(page) {
        // this.showLoading(); 로딩 이미지를 보여주는 함수. 후에 추가해주자

        fetch(`${this.url}&page=${page}&orderby=${this.orderby}`)
            .then(res => res.json())
            .then(myJson => {
                console.log(myJson);
                this.itemLength = myJson.length;
                this.makeItemList(myJson);
            }).catch(err => {
            console.log(err);
        }).then(() => {
            // this.hideLoading(); 로딩 이미지를 숨기는 함수. 후에 추가해주자
        });
    }
}

//profilejs
const menu = document.querySelector('label .menu');
if(menu) {
    menu.addEventListener('click', () => {
        color();
    });
}

// const other_color = 'rgba(255, 255, 255, 0.421)';
const other_color ='rgba(0, 0, 0, 0.421)';

function color() {
    const currentColor = menu.style.background;
    if (currentColor === '') {
        menu.style.background = other_color;
    } else {
        menu.style.background = '';
    }
}

const menuListUlElem = document.querySelector('.menu-list ul');
const chk = document.querySelector('#chk');
if(chk) {
    chk.addEventListener('change', () => {
        console.log(chk.checked);

        if (chk.checked && menuListUlElem) {
            // menuListUlElem.style.opacity = 1;
            menuListUlElem.style.display = 'block';
        } else {
            menuListUlElem.style.display = 'none';
        }
    });
}


window.onload = function () {
    if(menuListUlElem) {
        menuListUlElem.style.display = 'none';
    }
}


// 헤더 검색창
'use strict';

const searchBox = document.querySelectorAll('.search-box input[type="text"] + span');

searchBox.forEach(elm => {
    elm.addEventListener('click', () => {
        elm.previousElementSibling.value = '';
    });
});




//-------------------underLine---------------------------------->
const linkUrl = document.location.href;
const navaTagElems = document.querySelectorAll('.ALL');
navaTagElems.forEach((aTag) => {
    if(aTag.href === linkUrl) {
        aTag.classList.add('active');
    }
})



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
    if (!$(this).hasClass('active') && !nav.hasClass('animate')) {
        //.parent()는 어떤 요소의 부모요소를 선택함
        //.hasClass()는 선택한 요소에 클래스가 있는지 확인한다.
        nav.addClass('animate');

        var _this = $(this);

        nav.find('ul li a').removeClass('active');

        var position = _this.position();
        var width = _this.width();

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
                _this.addClass('active');
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
                _this.addClass('active');
            });
        }

        pos = position.left;
        wid = width;
    }
});


//---------------------------------------------------->
//

