// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

const teamSwiper = new Swiper(".team__list", {
  slidesPerView: 1.3,
  spaceBetween: 32,
  speed: 800,
  // loop: true,
  loadPrevNext: true,
  // Navigation arrows
  navigation: {
    nextEl: ".team__btn-r",
    prevEl: ".team__btn-l",
  },
  breakpoints: {
    280: {
      slidesPerView: 1.3,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    560: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    827: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
});

const historySwiper = new Swiper(".videos__slider", {
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 800,
  loop: true,
  loadPrevNext: true,
  // Navigation arrows
  navigation: {
    nextEl: ".videos__slider-btn-r",
    prevEl: ".videos__slider-btn-l",
  },
  breakpoints: {
    375: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    560: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    827: {
      slidesPerView: 3,
      spaceBetween: 16,
    },

    1367: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

const aboutSwiper = new Swiper(".about__slider", {
  slidesPerView: 1,
  spaceBetween: 10,
  speed: 800,
  loop: true,
  loadPrevNext: true,
  // Navigation arrows
  navigation: {
    nextEl: ".about__slider-button",
  },
  breakpoints: {
    375: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    560: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  },
});

const popupMainSwiper = new Swiper(".popup-card__main-slider", {
  slidesPerView: "auto",
  spaceBetween: 10,
  speed: 800,
  // loop: true,
  loadPrevNext: true,
  // Navigation arrows
  navigation: {
    nextEl: ".popup-card__slider-btn-r",
    prevEl: ".popup-card__slider-btn-l",
  },
});

const popupDuplicateSwiper = new Swiper(".popup-card__duplicate-slider", {
  slidesPerView: "auto",
  spaceBetween: 10,
  speed: 800,
  // loop: true,
  loadPrevNext: true,
});

const swipeAllSliders = (index) => {
  popupMainSwiper.slideTo(index);
  popupDuplicateSwiper.slideTo(index);
};

popupMainSwiper.on("slideChange", () => {
  swipeAllSliders(popupMainSwiper.activeIndex);
});
popupDuplicateSwiper.on("click", (e) => {
  swipeAllSliders(e.clickedIndex);
});
