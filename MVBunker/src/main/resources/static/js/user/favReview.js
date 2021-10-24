const sectionElem = document.querySelector('#allReviewContainer');

/* 인피니트 스크롤링 설정 */
// const allReviewContainerElem = document.getElementById('allReviewContainer');
infinityScrolling.limit = 10;
infinityScrolling.url = `/user/getFavReviewInfinite?i_user=${authUserPk}`; // 요청보낼 url
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(result) { // 받은 애들 어떻게 뿌릴지
    const p2Elem = document.createElement('div');
    p2Elem.classList.add('p2');
    const ptagElem = document.createElement('p');
    // ptagElem.innerText = `리뷰`
    const reviewList = result.selReviewList;
    /* 인피니트 스크롤링 객체에서는 에이잭스로 넘겨받은 애의 길이를 바로 잡는데 여기선 리뷰리스트를 바로 넘겨받는게 아니라 이렇게 수정 해주기 */
    infinityScrolling.itemLength = reviewList.length;
    console.log('reviewList = ' + reviewList);
    reviewList.forEach(review => {
        const figureElem = document.createElement('figure');
        const oneposterElem = document.createElement('div');
        oneposterElem.classList.add('oneposter');
        const divtag1Elem = document.createElement('div');
        const toReviewDetailaTagElem = document.createElement('a');
        toReviewDetailaTagElem.href = "/review/reviewDetail?movieId=" + review.id;
        const posterimgElem = document.createElement('img');
        posterimgElem.className = 'posterimg';
        posterimgElem.src = 'https://image.tmdb.org/t/p/w500/' + review.poster;
        const onereviewElem = document.createElement('div');
        onereviewElem.classList.add('onereview');
        const moreiconElem = document.createElement('div');
        const itagElem = document.createElement('i');
        moreiconElem.classList.add('moreicon');
        moreiconElem.addEventListener('click', function(e){
            // console.log(e.currentTarget);
            // console.log(e.currentTarget.getElementsByClassName('fas fa-caret-down'));
            // console.log(e.currentTarget.getElementsByClassName("asd"+'fas fa-caret-up'));
            if(e.currentTarget.getElementsByClassName('fas fa-caret-down')[0]){
                e.currentTarget.previousSibling.previousSibling.className='hide'; //writeElem
                e.currentTarget.previousSibling.className='detailreview'; //detailreview

                onereviewElem.style.height = '0';

                e.currentTarget.getElementsByClassName('fas fa-caret-down')[0].className='fas fa-caret-up';
            }else if(e.currentTarget.getElementsByClassName('fas fa-caret-up')[0]){
                e.currentTarget.previousSibling.previousSibling.className='write'; //writeElem
                e.currentTarget.previousSibling.className='detailreview hide'; //detailreview

                onereviewElem.removeAttribute('style');

                e.currentTarget.getElementsByClassName('fas fa-caret-up')[0].className='fas fa-caret-down';
            };
        });
        itagElem.classList='fas fa-caret-down';
        const br1Elem = document.createElement('br');
        const personalElem = document.createElement('div');
        personalElem.classList.add('personal');

        const fff = document.createElement('div');
        fff.classList.add('fff');
        figureElem.append(fff);
        fff.append(onereviewElem);
        fff.append(oneposterElem);

        onereviewElem.append(personalElem);

        const toFollowingReviewerDetailaTagElem = document.createElement('a');
        toFollowingReviewerDetailaTagElem.href = '/user/followingReviewerDetail?i_user=' + review.i_user;
        const profileimgElem = document.createElement('img');
        profileimgElem.className = 'profileimg';
        if(review.profileImg == null){
            review.profileImg == '/img/noprofile.png';
        }
        profileimgElem.src= `${review.profileImg}`;
        const userElem = document.createElement('div');
        userElem.className = 'user';
        userElem.innerText = `${review.unn} | ${review.regdt}`;
        // const br2Elem = document.createElement('br');
        const starElem = document.createElement('div');
        starElem.classList.add('star');
        starElem.innerText = `평점 : ${review.totalAvg_Review}`;
        const writeElem = document.createElement('div');
        writeElem.classList.add('write');
        writeElem.innerText = `리뷰 : ${review.re_ctnt}`;

        const frameElem = document.createElement('div');
        frameElem.className = 'detailreview hide';
        const headElem = document.createElement('div');
        headElem.innerText = '리뷰';
        const textElem = document.createElement('div');
        textElem.innerText = review.re_ctnt;

        frameElem.append(headElem);
        frameElem.append(textElem);

        // p2Elem.append(ptagElem);
        oneposterElem.append(divtag1Elem);
        toReviewDetailaTagElem.append(posterimgElem);
        divtag1Elem.append(toReviewDetailaTagElem);
        // oneposterElem.append(br1Elem);
        onereviewElem.append(personalElem);
        toFollowingReviewerDetailaTagElem.append(profileimgElem);
        personalElem.append(toFollowingReviewerDetailaTagElem);
        personalElem.append(userElem);
        // personalElem.append(br2Elem);

        // personalElem.append(starElem);
        fff.append(starElem);

        onereviewElem.append(writeElem);
        onereviewElem.append(frameElem);
        onereviewElem.append(moreiconElem);

        moreiconElem.append(itagElem);
        // onereviewElem.append(divdiv);
        // figureElem.append(p2Elem);
        figureElem.append(fff);
        // figureElem.append(oneposterElem);
        //
        // figureElem.append(onereviewElem);
        // figureElem.append(personalElem);

        sectionElem.append(figureElem);



        // imgFrameElem.addEventListener('click', (e) => {
        //     window.location.href = `/review/reviewDetail?movieId=${review.id}`;
        // })
        // const imgElem = document.createElement('img');
        // imgElem.className = 'img2';
        // imgElem.src = 'https://image.tmdb.org/t/p/w500/' + review.poster;
        // const tableElem = document.createElement('ul');
        // tableElem.classList.add('table');
        // const unnLiElem = document.createElement('li');
        // unnLiElem.innerText = `닉네임 : ${review.unn}`;
        // const titleElem = document.createElement('li');
        // titleElem.innerText = `영화 : ${review.title}`;
        // const reviewCtntElem = document.createElement('li');
        // reviewCtntElem.innerText = `리뷰 : ${review.re_ctnt}`
        // const evalAvgElem = document.createElement('li');
        // evalAvgElem.innerText = `평점 : ${review.totalAvg_Review}`;
        // tableElem.append(unnLiElem);
        // tableElem.append(titleElem);
        // tableElem.append(reviewCtntElem);
        // tableElem.append(evalAvgElem);
        // imgFrameElem.append(imgElem);
        // frameElem.append(imgFrameElem);
        // frameElem.append(tableElem);
        // ALLElem.append(frameElem);
        // allReviewContainerElem.append(ALLElem);
        // 컨테이너 주소 변수.innerHTML += `<div>${review.title}</div>`;
    })
}