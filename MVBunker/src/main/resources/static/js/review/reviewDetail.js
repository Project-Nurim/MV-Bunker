
// 유튜브 트레일러 뿌려주기
const videoKey = document.querySelector('#video').dataset.movieId;
const movieIdVal = document.querySelector('#movieIdInput').value;
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        height: '360',
        width: '640',
        playerVars: {'controls': 0 },
        videoId: videoKey
    });
}
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);