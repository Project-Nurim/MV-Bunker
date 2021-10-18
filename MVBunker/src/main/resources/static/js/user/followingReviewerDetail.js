// 로그인 안한사람인지
const heartDivElem = document.querySelector('.heart');
const isAnonymous = heartDivElem.dataset.anonymous;

// 유저 구독 Proc
const heart = document.getElementById("ht");
const heartt = document.getElementById("htt");
const i_userVal = heartDivElem.dataset.iuser;

heart.addEventListener('click',function(){
    if(isAnonymous) {
        alert('로그인이 필요합니다.');
    }else {
        followingProc.method = 'POST';
        followingProc.doFollowReviewer();
    }
})

heartt.addEventListener('click',function(){
    followingProc.method = 'DELETE';
    followingProc.unDoFollowReviewer();
})


const followingProc = {
    method: '',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    data: {
        sub_ed_user: i_userVal
    },
    doFollowReviewer: function () {
        fetch('/user/subscribe', {
            method: this.method,
            body: JSON.stringify(this.data),
            headers: this.headers,
        }).then(res => res.json())
            .then(myJson => {
                if(myJson === 1) {
                    checkFav();
                }else {
                    alert('좋아요 실패. 오류 발생.');
                }
            })
    },
    unDoFollowReviewer: function () {
        fetch(`/user/subscribe/${i_userVal}`, {
            method: this.method
        }).then(res => res.json())
            .then(myJson => {
                if(myJson === 1) {
                    checkFav();
                }else {
                    alert('좋야요 취소 실패. 오류 발생.');
                }
            })
    }
}
function checkFav() {
    fetch(`/user/subscribe/${i_userVal}`, {method: 'GET'})
        .then(res => res.json())
        .then(myJson => {
            if(myJson === 1) {
                heart.style.display = 'none';
                heartt.style.display = 'block';
            }else {
                heart.style.display ='block';
                heartt.style.display = 'none';
            }
        })
}
if(!isAnonymous) {
    checkFav();
}