
const menuListUlElem = document.querySelector('.menu-list ul');
const chk = document.querySelector('#chk');
chk.addEventListener('change', () => {
    console.log(chk.checked);

    if (chk.checked) {
        // menuListUlElem.style.opacity = 1;
        menuListUlElem.style.display = 'block';
    } else {
        menuListUlElem.style.display = 'none';
    }
});

window.onload = function(){
    menuListUlElem.style.display = 'none';
}

const menu = document.querySelector('label .menu');
menu.addEventListener('click', () => {
    color();
});
const other_color = 'rgba(255, 255, 255, 0.421)';



function color() {
    const currentColor = menu.style.background;
    if (currentColor === '') {
        menu.style.background = other_color;
    } else {
        menu.style.background = '';
    }


}


function show() {
    let uidElem = document.querySelector(".email");
    let upwElem = document.querySelector(".log2");
    const mailValue = document.querySelector('#mails');

    if (uidElem.value === "") {
        alert("아이디를 확인해주세요");
    } else if (upwElem.value === "") {
        alert("비밀번호를 확인해주세요");
    } else {
        uidElem.value += mailValue.value;
        document.getElementById('loginForm').submit();
    }
}


function check() {
    var upw = document.getElementById("pw").value;
    var pw2 = document.getElementById("pw2").value;
    var unm = document.getElementById("join").value;
    var unn = document.getElementById("nick").value;
    var uid = document.getElementById("email").value;
    var age = document.getElementById("age").value;
    var num = /[0-9]/;
    var eng = /[a-zA-Z]/;
    var spe = /[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/;
    var pw_msg = "";


    if (unm == "") {
        alert("이름을 입력해주세요");
        return false;
    } else if (unn == "") {
        alert("닉네임을 입력해주세요");
        return false;
    } else if (age == "") {
        alert("나이를 기입하세요");
        return false;
    } else if (uid == "" || uid.length < 6) {
        alert("이메일을 가입하세요");
    } else if (upw == "" || upw.length < 6) {
        alert("비밀번호를 6글자 이상 입력하세요");
        return false;
    } else if (!num.test(upw) || !eng.test(upw) || !spe.test(upw)) {
        alert("영문+숫자+특수기호 포함");
        return false;
    } else if (upw != pw2) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    } else {
        // 회원가입 성공시
        var param = {
            uid,
            upw,
            age,
            unm,
            unn
        }
        sendPost('/user/join', param);
        clear();
    }
    return true;
}


function sendPost(action, params) {
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', action);
    document.charset = "utf-8";
    for ( var key in params) {
        var hiddenField = document.createElement('input');
        hiddenField.setAttribute('type', 'hidden');
        hiddenField.setAttribute('name', key);
        hiddenField.setAttribute('value', params[key]);
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
}

function clear() {
    document.querySelector("#join").value = '';
    document.querySelector("#nick").value = '';
    document.querySelector("#age").value = '';
    document.querySelector("#email").value = '';
    document.querySelector("#pw").value = '';
    document.querySelector("#pw2").value = '';
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
        backgroundColor: 'rgba(0,0,0,0.4)'
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

/*-------------------------------------------------------------------------------------- */
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
/*--------------------------------------------------------------------*/



/*--------------------
Vars
--------------------*/
const $menu = document.querySelector('.menuu');
const $items = document.querySelectorAll('.menu--item');
let menuHeight = $menu.clientHeight;
let itemHeight = $items[0].clientHeight;
let wrapHeight = $items.length * itemHeight;

let scrollSpeed = 0;
let oldScrollY = 0;
let scrollY = 0;
let y = 0;


/*--------------------
           Lerp
           --------------------*/
const lerp = (v0, v1, t) => {
    return v0 * (1 - t) + v1 * t;
};


/*--------------------
   Dispose
   --------------------*/
const dispose = scroll => {

    gsap.set($items, {
        y: i => {
            return i * itemHeight + scroll;
        },
        // modifiers: {
        //   y: (y, target) => {
        //     const s = gsap.utils.wrap(-itemHeight, wrapHeight - itemHeight, parseInt(y));
        //     return `${s}px`;
        //   }
        // }
    });


};
dispose(0);


/*--------------------
            Wheel
            --------------------*/
const handleMouseWheel = e => {
    scrollY -= e.deltaY;
};


/*--------------------
   Touch
   --------------------*/
let touchStart = 0;
let touchY = 0;
let isDragging = false;
const handleTouchStart = e => {
    touchStart = e.clientY || e.touches[0].clientY;
    isDragging = true;
    $menu.classList.add('is-dragging');
};
const handleTouchMove = e => {
    if (!isDragging) return;
    touchY = e.clientY || e.touches[0].clientY;
    scrollY += (touchY - touchStart) * 2.5;
    touchStart = touchY;
};
const handleTouchEnd = () => {
    isDragging = false;
    $menu.classList.remove('is-dragging');
};


/*--------------------
   Listeners
   --------------------*/

$menu.addEventListener('mousewheel', handleMouseWheel);

$menu.addEventListener('touchstart', handleTouchStart);
$menu.addEventListener('touchmove', handleTouchMove);
$menu.addEventListener('touchend', handleTouchEnd);

$menu.addEventListener('mousedown', handleTouchStart);
$menu.addEventListener('mousemove', handleTouchMove);
$menu.addEventListener('mouseleave', handleTouchEnd);
$menu.addEventListener('mouseup', handleTouchEnd);

$menu.addEventListener('selectstart', () => {
    return false;
});


/*--------------------
                                                              Resize
                                                            --------------------*/

window.addEventListener('resize', () => {
    menuHeight = $menu.clientHeight;
    itemHeight = $items[0].clientHeight;
    wrapHeight = $items.length * itemHeight;
});

/*--------------------
    Render
    --------------------*/
const render = () => {
    requestAnimationFrame(render);
    y = lerp(y, scrollY, .1);
    dispose(y);

    scrollSpeed = y - oldScrollY;
    oldScrollY = y;

    gsap.to($items, {
        scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * .005,
        rotate: scrollSpeed * 0.2
    });

};
render();
/*----------------------------------------------------------------- */

class TextGlitch {
    constructor(root) {
        this._root = root;
        this._elClips = root.querySelectorAll(".TextGlitch-clip");
        this._elWords = root.querySelectorAll(".TextGlitch-word");
        this._frame = this._frame.bind(this);
        this._unglitch = this._unglitch.bind(this);
        this._frameId = null;
        this._text = "";
        this._textAlt = [];
        Object.seal(this);

        this.setTexts([
            "BUNKER",
            "bnuker",
            "bonkor",
            "buuker",
            "Bunvir",
        ]);

        // this.setTexts( [
        //  "hello world !",
        //  "HELLO WORLD ?",
        //  "µ3770 3027q ?",
        //  "µ311p MQ51b ?",
        // ] );
    }

    on() {
        if (!this._frameId) {
            this._frame();
        }
    }
    off() {
        clearTimeout(this._frameId);
        this._frameId = null;
        this._unglitch();
    }
    setTexts([text, ...alt]) {
        this._text = text;
        this._textAlt = alt;
    }

    // private:
    // .....................................................................
    _frame() {
        this._glitch();
        setTimeout(this._unglitch, 50 + Math.random() * 200);
        this._frameId = setTimeout(this._frame, 250 + Math.random() * 500);
    }
    _glitch() {
        this._addClipCSS();
        this._textContent(this._randText());
        this._root.classList.add("TextGlitch-blended");
    }
    _unglitch() {
        this._removeClipCSS();
        this._textContent(this._text);
        this._root.classList.remove("TextGlitch-blended");
    }
    _textContent(txt) {
        this._elWords.forEach(el => el.textContent = txt);
    }

    // CSS clip-path, to cut the letters like an overflow:hidden
    // .....................................................................
    _addClipCSS() {
        const clips = this._elClips,
            clip1 = this._randDouble(.1),
            clip2 = this._randDouble(.1);

        clips[0].style.transform = `translate(${ this._randDouble( .3 ) }em, .02em)`;
        clips[2].style.transform = `translate(${ this._randDouble( .3 ) }em, -.02em)`;
        clips[0].style.clipPath = `inset( 0 0 ${ .6 + clip1 }em 0 )`;
        clips[1].style.clipPath = `inset( ${ .4 - clip1 }em 0 ${ .3 - clip2 }em 0 )`;
        clips[2].style.clipPath = `inset( ${ .7 + clip2 }em 0 0 0 )`;
    }
    _removeClipCSS() {
        this._elClips.forEach(el => {
            el.style.clipPath =
                el.style.transform = "";
        });
    }

    // Switch some chars randomly
    // .....................................................................
    _randText() {
        const txt = Array.from(this._text);

        for (let i = 0; i < 12; ++i) {
            const ind = this._randInt(this._text.length);

            txt[ind] = this._textAlt[this._randInt(this._textAlt.length)][ind];
        }
        return txt.join("");
    }

    // rand utils
    // .....................................................................
    _randDouble(d) {
        return Math.random() * d - d / 2;
    }
    _randInt(n) {
        return Math.random() * n | 0;
    }
}

const elTitle = document.querySelector("#title");
const glitch = new TextGlitch(elTitle);

glitch.on();

/* ------------------------ 로그인 실패 시 ------------------------------- */
const urlStr = window.location.href;
const url = new URL(urlStr);
const urlParams = url.searchParams;
function loginFailure() {
    console.log(urlParams.get('error'));
    if(urlParams.get('error') === 'true') {
        alert('아이디 또는 비밀번호를 확인해 주십시오.');
    }
}
loginFailure();