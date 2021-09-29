document.querySelector('.trigger').addEventListener('click', (e) => {
    document.querySelector('#byeUserModal').classList.add('open');
});
document.querySelector('.btn-close').addEventListener('click', (e) => {
    document.querySelector('#byeUserModal').classList.remove('open');
});
document.querySelector('.btn-modPassword').addEventListener('click', (e) => {
    document.querySelector('#pw_modal').classList.add('open');
})
document.querySelector('.pwMod-close').addEventListener('click', (e) => {
    document.querySelector('#pw_modal').classList.remove('open');
});

async function bye_confirm () {
    const upw = document.getElementsByName('upw')[0].value;
    const upw_chk = document.getElementsByName('upw_chk')[0].value;
    const del_chk = document.getElementsByName('del_chk')[0].value;
    if(upw === upw_chk && del_chk === '탈퇴하겠습니다.') {
        if(await checkPw(upw))
        return confirm('탈퇴하시겠습니까?');
    }else {
        alert('다시 입력해주십시오.');
        return false;
    }
}

const pw_modalElem = document.querySelector('#pw_modal');
document.querySelector('#pw_mod_btn').addEventListener('click', async (e) => {
    const modalUpwElem = pw_modalElem.querySelector('#modalUpw').value;
    const modalUpwChkElem = pw_modalElem.querySelector('#modalUpwChk').value;
    const modalNewUpwElem = pw_modalElem.querySelector('#modalNewUpw').value;
    if(modalUpwElem === modalUpwChkElem) {
        const pass = await checkPw(modalUpwElem)
        console.log(pass);
        if(pass) {
            document.querySelector('#pwHiddenElem').value = modalNewUpwElem;
            document.querySelector('#pw_modal').classList.remove('open');
            for(let i = 0; i < modalNewUpwElem.length; i++) {
                document.querySelector('#upwStarView').innerText += '*';
            }
        }else {
            alert('비밀번호가 틀렸습니다.');
        }
    }else {
        alert('비밀번호가 틀렸습니다.');
    }
})

function checkPw(upw) {
    return fetch('/user/checkPw', {
        method: 'POST',
        body: JSON.stringify({upw:upw}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}
document.querySelector('#imgInput').addEventListener('change', (e) => {
    setThumbnail(e);
})
function setThumbnail(event) {
    const reader = new FileReader();
    reader.onload = function(event) {
        document.querySelector(".mainProfile").src = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
