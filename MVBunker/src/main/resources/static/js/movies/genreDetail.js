const movieContainerElem = document.querySelector('.movie-container')
const genreIdElem = document.querySelector('#genreId').value;
infinityScrolling.url = `/movies/genreDetailScrolling?genreId=${genreIdElem}`;
infinityScrolling.makeItemList = makeItemList;
infinityScrolling.setScrollInfinity(window);
infinityScrolling.getItemList(1);
function makeItemList(movieList) {
    console.log(movieList);
    movieList.forEach(movie => {
        const img = document.createElement('img');
        img.src = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
        movieContainerElem.append(img);

        // = movieContainerElem.innerHTML += `<img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}'>`;
    })
}