let in1 = document.getElementById("in1");
let in2 = document.getElementById("in2");
let in3 = document.getElementById("in3");
let in4 = document.getElementById("in4");
let numInputs = document.querySelectorAll(".vins input");

numInputs.forEach((e, i) => {
  e.addEventListener("input", () => {
    if (e.value.length >= 1) {
      e.value = e.value[0];
      if (i < numInputs.length - 1) {
        numInputs[i + 1].focus();
      }
    }
    if (e.value.length == 0) {
      if (i !== 0 && i < numInputs.length) {
        numInputs[i - 1].focus();
      }
    }
  });
});
