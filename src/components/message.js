export const  Message =(message)=>{
  let div = document.createElement("div");
  div.className = "message";
  let span = document.createElement("span");
  span.innerHTML = message;
  document.body.appendChild(div);
  div.appendChild(span);
  setTimeout(() => {
    div.remove();
  }, 2700);
}