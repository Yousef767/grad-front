let pagSpans = document.querySelectorAll(".page-link");

pagSpans.forEach((e) => {
  e.addEventListener("click", () => {
    pagSpans.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.add("active");
  });
});

