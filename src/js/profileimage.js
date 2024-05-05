let input = document.getElementById('img');
let img = document.getElementById('imgSrc');

input.addEventListener('input',()=>{
  let src = URL.createObjectURL(input.files[0]);
  img.src = src;
})