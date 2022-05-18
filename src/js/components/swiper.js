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
  slidesPerView: 1.5,
  spaceBetween: 10,
  speed: 800,
  // loop: true,
  loadPrevNext: true,
  // Navigation arrows
  navigation: {
    nextEl: ".popup-card__slider-btn-r",
    prevEl: ".popup-card__slider-btn-l",
  },
  breakpoints: {
    390: {
      slidesPerView: "auto",
      spaceBetween: 10,
    },
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

const SLIDER_VIDEO_PLAYER_CONST = {
  playClass: "video-is-playing-js",
  plauseClass: "video-on-pause-js",
};

const sliderVideoPlayer = (slider, className) => {
  const { playClass, plauseClass } = SLIDER_VIDEO_PLAYER_CONST;

  const videoSlides = [...slider.slides].filter((video) =>
    video.classList.contains(className)
  );

  if (videoSlides) {
    videoSlides.forEach((slide) => {
      const video = slide.querySelector("video");
      const playVideo = () => {
        if (!slide.classList.contains(playClass)) {
          slide.classList.add(playClass);
          slide.classList.remove(plauseClass);
          video.play();
        } else {
          video.pause();
          slide.classList.add(plauseClass);
          slide.classList.remove(playClass);
        }
      };
      const setAttribute = () => {
        if (video.getAttribute("data-src")) {
          const src = video.getAttribute("data-src");
          video.setAttribute("src", src);
          video.removeAttribute("data-src");
          slide.removeEventListener("click", setAttribute);
        }
      };
      slide.addEventListener("click", setAttribute);
      slide.addEventListener("click", playVideo);
      video.addEventListener("ended", () => slide.classList.remove(playClass));
    });
  }
};

sliderVideoPlayer(popupMainSwiper, "_icon-play");
// sliderVideoPlayer(popupDuplicateSwiper, "_icon-play");
