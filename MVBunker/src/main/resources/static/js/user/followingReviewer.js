
    const side = document.querySelector('.side');
    const chk = document.querySelector('#chk');
    if (chk) {
        chk.addEventListener('change', () => {
            console.log(chk.checked);

            if (chk.checked && side) {
                // menuListUlElem.style.opacity = 1;
                side.style.display = 'block';
                menu.style.background = 'rgba(0,0,0)';
            } else {
                side.style.display = 'none';
            }
        });
    }
}
console.log('hi');