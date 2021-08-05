var nav = $('nav');
var line = $('<div>').addClass('line'); //.addclass()로 선택한 요소에 클래스값을 추가할수 있다.

line.appendTo(nav); //선택한 요소를 다른 요소 안에 넣는다.
//ex)$('p').appendTo('blockquote');는 p요소를 blockquote 요소 안으로 이동시킨다.
//ex)$('span.abc').appendTo('h1');
var active = nav.find('.active'); // 어떤 요소의 하위 요소 중 특정 요소를 찾을 때 사용
// nav 요소의 하위 요소 중 .active요소를 선택
var pos = 0;
var wid = 0;

if (active.length) {
    pos = active.position().left;
    wid = active.width();
    line.css({
        left: pos,
        width: wid
    });
}
//-----------------------------단어길이를 기준으로 시작점과 가로길이 정한듯
nav.find('ul li a').hover(function (e) {
    e.preventDefault();
    if (!$(this).parent().hasClass('active') && !nav.hasClass('animate')) {
        //.parent()는 어떤 요소의 부모요소를 선택함
        //.hasClass()는 선택한 요소에 클래스가 있는지 확인한다.
        nav.addClass('animate');

        var _this = $(this);

        nav.find('ul li').removeClass('active');

        var position = _this.parent().position();
        var width = _this.parent().width();

        if (position.left >= pos) {
            line.animate({
                width: ((position.left - pos) + width)
            }, 200, function () {
                line.animate({
                    width: width,
                    left: position.left
                }, 150, function () {
                    nav.removeClass('animate');
                });
                _this.parent().addClass('active');
            });
        } else {
            line.animate({
                left: position.left,
                width: ((pos - position.left) + wid)
            }, 200, function () {
                line.animate({
                    width: width
                }, 150, function () {
                    nav.removeClass('animate');
                });
                _this.parent().addClass('active');
            });
        }

        pos = position.left;
        wid = width;
    }
});