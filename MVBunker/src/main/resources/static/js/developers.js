const name = document.querySelectorAll('.name');
const mail = document.querySelectorAll('.mail');
let type = 0;

function go(){
  if(type == 0){
      mail[0].style.display = 'block';
      name[0].style.display = 'none';
      type = 1;
  }else{
      mail[0].style.display = 'none';
      name[0].style.display = 'block';
      type = 0;
  }
};

function go2(){
    if(type == 0){
        mail[1].style.display = 'block';
        name[1].style.display = 'none';
        type = 1;
    }else{
        mail[1].style.display = 'none';
        name[1].style.display = 'block';
        type = 0;
    }
};