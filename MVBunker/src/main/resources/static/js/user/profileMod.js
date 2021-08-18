document.querySelector('.trigger').addEventListener('click', (e) => {
    document.querySelector('.modal-wrapper').classList.add('open');
});
document.querySelector('.btn-close').addEventListener('click', (e) => {
    document.querySelector('.modal-wrapper').classList.remove('open');
})

function bye_confirm () {
    const upw = document.getElementsByName('upw')[0].value;
    const upw_chk = document.getElementsByName('upw_chk')[0].value;
    const del_chk = document.getElementsByName('del_chk')[0].value;
    if(upw === upw_chk && del_chk === '탈퇴하겠습니다.') {
        return confirm('탈퇴하시겠습니까?');
    }else {
        alert('다시 입력해주십시오.');
        return false;
    }
}



