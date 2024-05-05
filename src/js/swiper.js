var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 1500,
    disableOnInteraction: true,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    550: {
      slidesPerView: 1.4,
    },
    750: {
      slidesPerView: 1.5,
    },
    850: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 2.5,
    },
    1250: {
      slidesPerView: 3,
    },
  },
});
var swiper = new Swiper(".mySwiper2", {
  slidesPerView: 1,
  keyboard: {
    enabled: true,
  },
  autoplay: {
    delay: 1500,
    disableOnInteraction: true,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
});