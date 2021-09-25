var info = document.querySelector('.info');
var name= document.querySelector('.name');
var mail = document.querySelector('.mail');

function go() {
    info.eq(0).click(function () {
        name.style.display = "none";
        mail.style.display = "block";
    });

    info.eq(1).click(function () {
        mail.style.display = "none";
        name.style.display = "block";
    });
};

go();