const infinityScrolling = {
    limit: 5,
    itemLength: 0,
    currentPage: 1,
    url: '',
    orderby: 0,
    makeItemList: function() {},
    setScrollInfinity: function (target) {
        target.addEventListener('scroll', () =>{
            const{
                scrollTop,
                scrollHeight,
                clientHeight
            } = document.documentElement;
            if(scrollTop + clientHeight >= scrollHeight - 5 && this.itemLength === this.limit){
                this.itemLength = 0;
                this.getItemList(++this.currentPage);
            }
        }, { passive: true });
    },
    getItemList: function(page){
        fetch(`${this.url}&page=${page}&{orderby=${this.orderby}`)
            .then(res => res.json())
            .then(myJosn =>{
            console.log(myJosn);
            this.itemLength = myJosn.length;
            this.makeItemList(myJson);
        }).catch(err =>{
            console.log(err);
        }).then(() => {});
    }
}


const sectionElem = document.querySelector('#ALL');
infinityScrolling.url = `/user/myFavMovie?orderby=0`; // 요청보낼 url
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(result) { // 받은 애들 어떻게 뿌릴지
    const p2Elem = document.createElement('div');
    p2Elem.classList.add('p2');
    const ptagElem = document.createElement('p');
    ptagElem.innerText = `내가 찜한 영화`
    // const reviewList = result.selAllReview;
    // console.log('myFavMovieList = ' + myFavMovieList);
    myFavMovie.forEach( myFavMovie => {
        const container5Elem = document.createElement('ul');
        container5Elem.classList.add('container5');
        const cardElem = document.createElement('li');
        cardElem.classList.add('card');
        const span1Elem = document.createElement('span');
        const span2Elem = document.createElement('span');
        const span3Elem = document.createElement('span');
        const span4Elem = document.createElement('span');
        const contentElem = document.createElement('figure');
        contentElem.classList.add('content');
        const aTagElem = document.createElement('a');
        aTagElem.classList.add('aTag');
        const ximgElem = document.createElement('img');
        ximgElem.className = 'x';
        ximgElem.src = 'https://image.tmdb.org/t/p/w500/' + myFavMovie.poster;
        const darknessElem = document.createElement('div');
        darknessElem.classList.add('darkness');
        const btnElem = document.createElement('div');
        btnElem.classList.add('btn-plus');
        <!-- hover했을 때 뜨는거 -->
        const titleElem = document.createElement('div');
        titleElem.innerText = `${myFavMovie.title}`;
        const plotElem = document.createElement('div');
        plotElem.innerText = `${myFavMovie.plot}`;
        const releaseElem = document.createElement('div');
        releaseElem.innerText = `${myFavMovie.releaseDate}`;

        container5Elem.append(cardElem);
        cardElem.append(span1Elem);
        cardElem.append(span2Elem);
        cardElem.append(span3Elem);
        cardElem.append(span4Elem);
        cardElem.append(contentElem);
        contentElem.append(aTagElem);
        contentElem.append(ximgElem);
        contentElem.append(darknessElem);
        contentElem.append(btnElem);
        btnElem.append(titleElem);
        btnElem.append(plotElem);
        btnElem.append(releaseElem);

        sectionElem.append(container5Elem);
        
    })
}