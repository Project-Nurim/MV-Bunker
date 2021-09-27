const movieContainerElem = document.querySelector('.movie-container')
const genreIdElem = document.querySelector('#genreId').value;
infinityScrolling.url = `/movies/genreDetailScrolling?genreId=${genreIdElem}`;
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(movieList) {
    console.log(movieList);
    movieList.forEach(movie => {
        const figureElem = document.createElement('figure');
        const imgWrapperDivElem = document.createElement('div');
        imgWrapperDivElem.classList.add('img-wrapper');
        imgWrapperDivElem.classList.add('img1');
        const aTagElem = document.createElement('a');
        aTagElem.className = 'aTag';
        aTagElem.href = '/review/reviewDetail?movieId=' + movie.id;
        const img = document.createElement('img');
        if(movie.posterPath != null) { img.src = 'https://image.tmdb.org/t/p/w500/' + movie.posterPath; }
        img.className = 'x';
        const darknessElem = document.createElement('div');
        darknessElem.className = 'darkness';
        darknessElem.addEventListener('mouseover', (e) => {
            const imgElem = e.currentTarget.parentNode.querySelector('.x');
            e.currentTarget.style.transform = 'scale(1.2)'
            imgElem.style.transform= 'scale(1.2)';

        })
        darknessElem.addEventListener('mouseout',(e) => {
            const imgElem = e.currentTarget.parentNode.querySelector('.x');
            e.currentTarget.style.transform = 'scale(1)'
            imgElem.style.transform = 'scale(1)';
        })

        const btnPlusElem = document.createElement('div');
        btnPlusElem.className = 'btn-plus';
        const mElem = document.createElement('div');
        mElem.className = 'M';
        const scoreElem = document.createElement('div');
        scoreElem.innerText = movie.plot; // 나중에 수정
        const releaseDateElem = document.createElement('div');
        releaseDateElem.innerText = movie.releaseDate;
        const titleElem = document.createElement('div');
        titleElem.innerText = movie.title;
        // Tag들 만들기

        // Tag들 조립
        mElem.append(titleElem);
        mElem.append(scoreElem);
        mElem.append(releaseDateElem);
        btnPlusElem.append(mElem);
        aTagElem.append(img);
        aTagElem.append(darknessElem);
        aTagElem.append(btnPlusElem);
        imgWrapperDivElem.append(aTagElem);
        figureElem.append(imgWrapperDivElem);

        movieContainerElem.append(figureElem);

        // = movieContainerElem.innerHTML += `<img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}'>`;
    })
}

