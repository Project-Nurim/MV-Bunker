function w() {

    if (currentColor === '') {
        document.querySelector(".test").style.display = "none";
    } else {
        document.querySelector(".test").style.display = "block";
    }
}


const menuListUlElem = document.querySelector('.menu-list ul');
const chk = document.querySelector('#chk');
chk.addEventListener('change', () => {
    console.log(chk.checked);

    if (chk.checked) {
        menuListUlElem.style.opacity = 1;
    } else {
        menuListUlElem.style.opacity = 0;
    }
});

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


    if (currentColor === '') {
        document.querySelector(".test").style.display = "none";
    } else {
        document.querySelector(".test").style.display = "block";
    }

}

function login() {
    let upw = document.getElementsByName("upw")[0].value;
    let uid = document.getElementsByName("uid")[0].value;
    const portal = document.getElementsByName("job")[0].value;

    if (uid == "") {
        alert("아이디를 확인해주세요");
        return false;
    } else if (upw == "") {
        alert("비밀번호를 확인해주세요");
        return false;
    } else {
        const param = {
            uid: uid + '@' + portal,
            upw
        }
        sendPost('/user/login',param);
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

document.getElementById('popup_open_btn').addEventListener('click', function () {
    // 모달창 띄우기
    modal('my_modal');
});