
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

console.log('hi');

    /* 인피니트 스크롤 */
    const sectionElem = document.querySelector('#ALL');
    infinityScrolling.url = `/user/followingReviewer?orderby=0`; // 요청보낼 url
    infinityScrolling.makeItemList = makeItemList;
    infinityScrolling.setScrollInfinity(window);
    infinityScrolling.getItemList(1);
    function makeItemList(result) { // 받은 애들 어떻게 뿌릴지
        const p2Elem = document.createElement('div');
        p2Elem.classList.add('p2');
        const ptagElem = document.createElement('p');
        ptagElem.innerText = `내가 구독한 리뷰어`
        // const reviewList = result.selAllReview;
        // console.log('followingReviewer = ' + followingReviewer);
        followingReviewer.forEach( followingReviewer => {
            const container3Elem = document.createElement('ul');
            container3Elem.classList.add('container3');
            const cardElem = document.createElement('li');
            cardElem.classList.add('card');
            const span1Elem = document.createElement('span');
            const span2Elem = document.createElement('span');
            const span3Elem = document.createElement('span');
            const span4Elem = document.createElement('span');
            const contentElem = document.createElement('figure');
            contentElem.classList.add('content');
            const mainProfileElem = document.createElement('img');
            mainProfileElem.className = 'x';
            if(subuser.profileImg != null){
                const mainProfileElem = document.createElement('img');
                mainProfileElem.className = 'x';
                mainProfileElem.src = `${subuser.profileImg}`;
            }
            if(subuser.profileImg != null){
                const mainProfileElem = document.createElement('img');
                mainProfileElem.className = 'x';
                mainProfileElem.src = '/img/logo/noprofile.png';
            }
            const divtagElem = document.createElement('div');
            const proUnnElem = document.createElement('p');
            proUnnElem.classList.add('pro');
            proUnnElem.innerText = `${subuser.unn}`;
            const proRegdtElem = document.createElement('p');
            proRegdtElem.classList.add('pro');
            proRegdtElem.innerText = `${subuser.regdt}`;
            const proRclElem = document.createElement('p');
            proRclElem.classList.add('pro');
            proRclElem.innerText = `리뷰 ${subuser.countMyReview} 댓글 ${subuser.countMyReview_cmt} 좋아요 ${subuser.countMyReviewLike}` + "href=#";

            container3Elem.append(cardElem);
            cardElem.append(span1Elem);
            cardElem.append(span2Elem);
            cardElem.append(span3Elem);
            cardElem.append(span4Elem);
            cardElem.append(contentElem);
            contentElem.append(mainProfileElem);
            contentElem.append(divtagElem);
            divtagElem.append(proUnnElem);
            divtagElem.append(proRegdtElem);
            divtagElem.append(proRclElem);

            sectionElem.append(container3Elem);

        })
    }
}
