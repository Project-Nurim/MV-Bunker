
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
}
console.log('hi');
