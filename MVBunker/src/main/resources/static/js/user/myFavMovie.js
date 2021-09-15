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