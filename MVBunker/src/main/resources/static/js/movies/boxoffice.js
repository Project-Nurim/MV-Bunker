const { gsap, imagesLoaded } = window;

const myButtons = {
    prev: document.querySelector(".btn--left"),
    next: document.querySelector(".btn--right"),
};

const cardsContainerEl = document.querySelector(".cards__wrapper");
const cardItemList = cardsContainerEl.querySelectorAll('.card');

const appBgContainerEl = document.querySelector(".app__bg");
const appBgItemList = appBgContainerEl.querySelectorAll('.app__bg__image');

const cardInfosContainerEl = document.querySelector(".info__wrapper");
const cardInfoItemList = cardInfosContainerEl.querySelectorAll('.info');

myButtons.next.addEventListener("click", () => swapCards("right"));
myButtons.prev.addEventListener("click", () => swapCards("left"));

let centerIdx = 0;
let nextIdx = centerIdx + 1;
let nextNextIdx = nextIdx + 1;
let nextNext2Idx = nextNextIdx + 1;
let prevIdx = centerIdx - 1;
let prevPrevIdx = prevIdx - 1;
let prevPrev2Idx = prevPrevIdx - 1;
const itemLen = cardItemList.length;

function setView() {

    cardItemList.forEach(item => {
        item.className = 'card hidden';
    })

    cardItemList[centerIdx].classList.add('current--card');
    cardItemList[centerIdx].classList.remove('hidden');

    nextIdx = centerIdx + 1;
    nextNextIdx = nextIdx + 1;
    nextNext2Idx = nextNextIdx + 1;
    if (nextIdx == itemLen) {
        nextIdx = 0;
        nextNextIdx = 1;
        nextNext2Idx = 2;
    } else if(nextNextIdx == itemLen) {
        nextNextIdx = 0;
        nextNext2Idx = 1;
    } else if (nextNext2Idx == itemLen) {
        nextNext2Idx = 0;
    }

    prevIdx = centerIdx - 1;
    prevPrevIdx = prevIdx - 1;
    prevPrev2Idx = prevPrevIdx - 1;
    if (prevIdx < 0) {
        prevIdx = itemLen - 1;
        prevPrevIdx = itemLen - 2;
        prevPrev2Idx = itemLen - 3;
    } else if (prevIdx == 0) {
        prevPrevIdx = itemLen - 1;
        prevPrev2Idx = itemLen - 2;
    } else if (prevPrevIdx == 0) {
        prevPrev2Idx = itemLen - 1;
    }

    cardItemList[nextIdx].classList.add('next--card');
    cardItemList[nextIdx].classList.remove('hidden');

    cardItemList[nextNextIdx].classList.add('bbb--card');
    cardItemList[nextNextIdx].classList.remove('hidden');

    cardItemList[nextNext2Idx].classList.add('ddd--card');
    cardItemList[nextNext2Idx].classList.remove('hidden');


    cardItemList[prevIdx].classList.add('previous--card');
    cardItemList[prevIdx].classList.remove('hidden');

    cardItemList[prevPrevIdx].classList.add('ccc--card');
    cardItemList[prevPrevIdx].classList.remove('hidden');

    cardItemList[prevPrev2Idx].classList.add('aaa--card');
    cardItemList[prevPrev2Idx].classList.remove('hidden');
}


function swapCards(direction) {
    switch (direction) {
        case 'right':
            centerIdx++;
            if (centerIdx >= itemLen) {
                centerIdx = 0;
            }
            break;
        case 'left':
            centerIdx--;
            if (centerIdx < 0) {
                centerIdx = itemLen - 1;
            }

            break;
    }
    changeInfo(direction);
    setView();
}

function setInfo() {
    cardInfoItemList.forEach(item => {
        item.className = 'info';
    });

    appBgItemList.forEach(item => {
        item.className = 'app__bg__image';
    });

    let currentInfoEl = cardInfoItemList[centerIdx];
    let previousInfoEl = cardInfoItemList[prevIdx];
    let nextInfoEl = cardInfoItemList[nextIdx];
    let aInfoEl = cardInfoItemList[prevPrev2Idx];
    let bInfoEl = cardInfoItemList[nextNextIdx];
    let cInfoEl = cardInfoItemList[prevPrevIdx];
    let dInfoEl = cardInfoItemList[nextNext2Idx];

    currentInfoEl.classList.add('current--info');
    previousInfoEl.classList.add('previous--info');
    nextInfoEl.classList.add('next--info');
    aInfoEl.classList.add('aaa--info');
    bInfoEl.classList.add('bbb--info');
    cInfoEl.classList.add('ccc--info');
    dInfoEl.classList.add('ddd--info');

    appBgItemList[centerIdx].classList.add('current--image');
    appBgItemList[prevIdx].classList.add('previous--image');
    appBgItemList[nextIdx].classList.add('next--image');
    appBgItemList[prevPrev2Idx].classList.add('aaa--image');
    appBgItemList[nextNextIdx].classList.add('bbb--image');
    appBgItemList[prevPrevIdx].classList.add('ccc--image');
    appBgItemList[nextNext2Idx].classList.add('ddd--image');
}

function changeInfo(direction) {
    let currentInfoEl = cardInfoItemList[centerIdx];
    let previousInfoEl = cardInfoItemList[prevIdx];
    let nextInfoEl = cardInfoItemList[nextIdx];

    gsap.timeline()
        .to([myButtons.prev, myButtons.next], {
            duration: 0.02,
            opacity: 0.5,
            pointerEvents: "none",
        })
        .to(
            currentInfoEl.querySelectorAll(".text"),
            {
                duration: 0.02,
                stagger: 0.01,
                translateY: "-120px",
                opacity: 0,
            },
            "-="
        )
        .call(() => {
            setInfo();
        })
        .call(() => initCardEvents())
        .fromTo(
            direction === "right"
                ? nextInfoEl.querySelectorAll(".text")
                : previousInfoEl.querySelectorAll(".text"),


            {
                opacity: 0,
                translateY: "40px",
            },
            {
                duration: 0.4,
                stagger: 0.1,
                translateY: "0px",
                opacity: 1,
            }
        )
        .to([myButtons.prev, myButtons.next], {
            duration: 0.02,
            opacity: 1,
            pointerEvents: "all",
        });
}


function updateCard(e) {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const centerPosition = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
    };
    let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
    gsap.set(card, {
        "--current-card-rotation-offset": `${angle}deg`,
    });
    const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
    gsap.set(currentInfoEl, {
        rotateY: `${angle}deg`,
    });
}

function resetCardTransforms(e) {
    const card = e.currentTarget;
    const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
    gsap.set(card, {
        "--current-card-rotation-offset": 0,
    });
    gsap.set(currentInfoEl, {
        rotateY: 0,
    });
}

function initCardEvents() {
    const currentCardEl = cardsContainerEl.querySelector(".current--card");
    currentCardEl.addEventListener("pointermove", updateCard);
    currentCardEl.addEventListener("pointerout", (e) => {
        resetCardTransforms(e);
    });
}



function removeCardEvents(card) {
    card.removeEventListener("pointermove", updateCard);
}

function init() {

    let tl = gsap.timeline();

    tl.to(cardsContainerEl.children, {
        delay: 0.15,
        duration: 0.5,
        stagger: {
            ease: "power4.inOut",
            from: "right",
            amount: 0.1,
        },
        "--card-translateY-offset": "0%",
    })
        .to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
            delay: 0.5,
            duration: 0.4,
            stagger: 0.1,
            opacity: 1,
            translateY: 0,
        })
        .to(
            [myButtons.prev, myButtons.next],
            {
                duration: 0.4,
                opacity: 1,
                pointerEvents: "all",
            },
            "-=0.4"
        );
}



const waitForImages = () => {
    const images = [...document.querySelectorAll("img")];
    const totalImages = images.length;
    let loadedImages = 0;
    const loaderEl = document.querySelector(".loader span");

    gsap.set(cardsContainerEl.children, {
        "--card-translateY-offset": "100vh",
    });
    gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
        translateY: "40px",
        opacity: 0,
    });
    gsap.set([myButtons.prev, myButtons.next], {
        pointerEvents: "none",
        opacity: "0",
    });

    images.forEach((image) => {
        imagesLoaded(image, (instance) => {
            if (instance.isComplete) {
                loadedImages++;
                let loadProgress = loadedImages / totalImages;

                gsap.to(loaderEl, {
                    duration: 1,
                    scaleX: loadProgress,
                    backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
                });

                if (totalImages == loadedImages) {
                    gsap.timeline()
                        .to(".loading__wrapper", {
                            duration: 0.8,
                            opacity: 0,
                            pointerEvents: "none",
                        })
                        .call(() => init());
                }
            }
        });
    });
};

setView();
setInfo();
waitForImages();


initCardEvents();


