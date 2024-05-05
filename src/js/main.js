let links = document.querySelectorAll('.link')


links.forEach((e)=>{
  e.addEventListener('click',()=>{
    links.forEach((e)=>{e.classList.remove('active')})
    e.classList.add('active');
    nav.classList.remove('activeMenu');
  })
})

let nav = document.querySelector('nav');
let menu = document.querySelector('.menu');

if(menu){
  menu.addEventListener('click',()=>{
    nav.classList.toggle('activeMenu');
  })
}

window.addEventListener('scroll',()=>{
  if(window.scrollY >= 100){
    nav.classList.add('color');
  }else{
    nav.classList.remove('color');
  }
})

