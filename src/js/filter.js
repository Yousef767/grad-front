let filterLinks = document.querySelectorAll('.filtLinks a')


filterLinks.forEach((e)=>{
  e.addEventListener('click',()=>{
    filterLinks.forEach((e)=>{e.classList.remove('active')})
    e.classList.add('active')
  })
})