const infinityScrolling = {
    limit: 20,
    itemLength: 0,
    currentPage: 1,
    url: '',
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

        fetch(`${this.url}&page=${page}`)
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
$(document).ready(function(){
    var tl = new TimelineMax();

    $('.icon-wrap').click(function() {
        if($(this).hasClass('open')) {
            $(this).removeClass('open');
            tl.to('.icon-wrap', 0.3, {css:{width: '70px', boxShadow: '0px 6px 6px rgba(0,0,0,.28)'}})
            tl.to('.icon-wrap', 0.3, {css:{borderRadius: "50%"}}, '-=0.2')
            TweenMax.to('svg', 0.3, {fill: '#000', rotation: 0})
            TweenMax.to('input, label', 0.3, {width: 0})
        } else {
            $(this).addClass('open');
            tl.to('.icon-wrap', 0.7, {css:{borderRadius: "20px", width: '400px', boxShadow: 'rgba(0, 0, 0, 0.28) -3px 16px 52px 0px'}, ease: Elastic.easeOut.config(1, 0.7)})
            TweenMax.to('svg', 0.3, {fill: '#737272', rotation: '90deg'})
            TweenMax.to('input', 0.3, {width: '81%'})
            TweenMax.to('label', 0.3, {width: '78%'})
        }

    });

    $('input').focus(function() {
        $('.label-wrap').animate({opacity: 0},100);
    });
    $('input').blur(function() {
        if(!$(this).val() == '') {
            $('.label-wrap').animate({opacity: 0},100);
        } else {
            $('.label-wrap').animate({opacity: 1},1200);
        }
    });
});