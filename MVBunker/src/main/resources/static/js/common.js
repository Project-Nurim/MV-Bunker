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
            // console.log(scrollTop);
            // console.log(clientHeight);
            // console.log(scrollHeight);
            // console.log(this.limit);
            // console.log(this.itemLength);
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

let authUserPk = 0;
fetch('/user/getUserPk')
    .then(res => res.json())
    .then(myJson => {
        authUserPk = myJson;
        if(authUserPk === 0) {
            hideWriteBox();
        }
    })




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

//---------------------검색 proc------------------------->
const searchInputElem = document.querySelector('#searchInput');
searchInputElem.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        doSearch(searchInputElem.value);
    }
})

function doSearch(searchText) {
    window.location.href = `/movies/search?searchText=${searchText}`;
}

//-------------darkness 효과---------------------------->
function darknessEfx() {
    const darknessElems = document.querySelectorAll('.darkness');
    darknessElems.forEach(darknessElem => {
        darknessElem.addEventListener('mouseover', (e) => {
            const imgElem = e.currentTarget.parentNode.querySelector('.x');
            e.currentTarget.style.transform = 'scale(1.2)'
            imgElem.style.transform = 'scale(1.2)';
        })
        darknessElem.addEventListener('mouseout', (e) => {
            const imgElem = e.currentTarget.parentNode.querySelector('.x');
            e.currentTarget.style.transform = 'scale(1)'
            imgElem.style.transform = 'scale(1)';
        })
    })
}


function modal(id) {
    var zIndex = 9999;
    var modal = document.getElementById(id);

    // 모달 div 뒤에 희끄무레한 레이어
    var bg = document.createElement('div');
    bg.setStyle({
        position: 'fixed',
        zIndex: zIndex,
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%',
        overflow: 'auto',
        // 레이어 색갈은 여기서 바꾸면 됨
        backgroundColor: 'rgba(0,0,0,0.8)'
    });
    document.body.append(bg);

    // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
    modal.querySelector('.modal_close_btn').addEventListener('click', function () {
        bg.remove();
        modal.style.display = 'none';
    });

    modal.setStyle({
        position: 'fixed',
        display: 'block',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

        // 시꺼먼 레이어 보다 한칸 위에 보이기
        zIndex: zIndex + 1,

        // div center 정렬
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        webkitTransform: 'translate(-50%, -50%)'
    });
}

// Element 에 style 한번에 오브젝트로 설정하는 함수 추가
Element.prototype.setStyle = function (styles) {
    for (var k in styles) this.style[k] = styles[k];
    return this;
};

const popup_open_btnElem = document.getElementById('popup_open_btn');
if(popup_open_btnElem != null) {
    popup_open_btnElem.addEventListener('click', function () {
        // 모달창 띄우기
        modal('my_modal');
    });
}




function color() {
    const menu = document.querySelector('.menu');
    const other_color = 'rgba(0, 0, 0, 0.421)';
    const currentColor = menu.style.background;
    if (currentColor === '') {
        menu.style.background = other_color;
    } else {
        menu.style.background = '';
    }

    const side = document.querySelector('.side');
    const chk = document.querySelector('#chk');
    const bar = document.querySelector('#bar');
    const body = document.querySelector('body');
    if (chk) {
        chk.addEventListener('change', () => {
            console.log(chk.checked);

            if (chk.checked && side) {
                // menuListUlElem.style.opacity = 1;
                side.style.display = 'block';
                menu.style.background = 'rgba(0,0,0)';
                bar.style.display = 'block';
                body.style.overflow='hidden';
            } else {
                $('.side').fadeOut();
                $('#bar').fadeOut();
                body.style.overflow='auto';
            }
        });
    }
}
