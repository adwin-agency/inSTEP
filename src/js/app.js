/* eslint-disable no-unused-vars */
import Accordion from "accordion-js";
import Parallax from "parallax-js";

import Observer from "./components/observer.js";

import * as Swipers from "./components/swiper.js";

import Burger from "./components/burger.js";
import BURGER_CONSTANT from "./constants/burgerConst.js";

import Popups from "./components/popup.js";
import POPUP_CONSTANT from "./constants/popupConst.js";

import PopupMultimedia from "./components/popupMultimedia.js";
import POPUP_MULTIMEDIA_CONSTANT from "./constants/popupMultimediaConst.js";

import Header from "./components/header.js";
import HEADER_CONSTANT from "./constants/headerConst.js";

import Form from "./components/form.js";
import FORM_CONSTANT from "./constants/formConst.js";

import PopupForm from "./components/popupForm.js";
import POPUP_FORM_CONSTANT from "./constants/popupFormConst.js";

import ScrollTo from "./components/scrollTo.js";

import PopupCard from "./components/popupCard.js";
import POPUP_CARD_CONSTANT from "./constants/popupCardConst.js";

import { setMetrics } from "./utils/setMetrics.js";

const { popupDuplicateSwiper, popupMainSwiper } = Swipers;

const header = new Header(HEADER_CONSTANT);
const burger = new Burger(BURGER_CONSTANT);
const popup = new Popups(POPUP_CONSTANT);
const scrollTo = new ScrollTo();
const popupMultimedia = new PopupMultimedia(POPUP_MULTIMEDIA_CONSTANT);
const popupForm = new PopupForm(POPUP_FORM_CONSTANT);
const popupCard = new PopupCard(
  POPUP_CARD_CONSTANT,
  popupDuplicateSwiper,
  popupMainSwiper
);
const form = new Form(FORM_CONSTANT, popup);

const quoteParallaxOne = document.getElementById("quote-1");
const quoteParallaxTwo = document.getElementById("quote-2");
const interactiveParallax = document.getElementById("interactive");

const parallaxQuoteOne = new Parallax(quoteParallaxOne);
const parallaxQuoteTwo = new Parallax(quoteParallaxTwo);
const parallaxInteractive = new Parallax(interactiveParallax, {
  relativeInput: true,
  hoverOnly: true,
});

const faqAcc = new Accordion(".faq__body", {
  onlyChildNodes: false,
  pointerEvents: true,
});

// ====================== LAZY-LOADING ======================
const lazyImages = [
  ...document.querySelectorAll("img[data-lazy], source[data-lazy]"),
];
if (lazyImages) {
  lazyImages.forEach((image) => {
    const imageObserve = new Observer({
      element: image,
      imageLoad: true,
      rootMargin: "15%",
    });
  });
}
// ====================== ANIMATION ======================
const animUpwards = [...document.querySelectorAll("._anim-upwards")];
if (animUpwards) {
  animUpwards.forEach((animEl) => {
    const upWardsAnimation = new Observer({
      element: animEl,
      playOnce: true,
    });
  });
}

// ====================== METRIC ======================
const metrikOpenForm = [...document.querySelectorAll("[data-popup-form-open]")];
metrikOpenForm.forEach((element) => {
  element.addEventListener("click", () => {
    // eslint-disable-next-line no-unused-expressions
    window.ym && ym(87892948, "reachGoal", "openform");
    // eslint-disable-next-line no-unused-expressions
    window.VK && VK.Retargeting.Event("openform");
  });
});

const metrikOpenCard = [...document.querySelectorAll("[data-popup-card-open]")];
metrikOpenCard.forEach((element) => {
  element.addEventListener("click", () => {
    // eslint-disable-next-line no-unused-expressions
    window.ym && ym(87892948, "reachGoal", "podrobno");
    // eslint-disable-next-line no-unused-expressions
    window.VK && VK.Retargeting.Event("podrobno");
  });
});

const metrikPhone = [...document.querySelectorAll("[data-phone-metrik]")];
metrikPhone.forEach((element) => {
  element.addEventListener("click", () => {
    // eslint-disable-next-line no-unused-expressions
    window.ym && ym(87892948, "reachGoal", "clickphone");
    // eslint-disable-next-line no-unused-expressions
    window.VK && VK.Retargeting.Event("clickphone");
  });
});

const metrikVk = [...document.querySelectorAll("._icon-telegram")];
metrikVk.forEach((element) => {
  element.addEventListener("click", () => {
    // eslint-disable-next-line no-unused-expressions
    window.ym && ym(87892948, "reachGoal", "tg");
    // eslint-disable-next-line no-unused-expressions
    window.VK && VK.Retargeting.Event("tg");
  });
});

const metrikTg = [...document.querySelectorAll("._icon-vk")];
metrikTg.forEach((element) => {
  element.addEventListener("click", () => {
    // eslint-disable-next-line no-unused-expressions
    window.ym && ym(87892948, "reachGoal", "vk");
    // eslint-disable-next-line no-unused-expressions
    window.VK && VK.Retargeting.Event("vk");
  });
});

const metrikYtb = [...document.querySelectorAll("._icon-youtube")];
metrikYtb.forEach((element) => {
  element.addEventListener("click", () => {
    // eslint-disable-next-line no-unused-expressions
    window.ym && ym(87892948, "reachGoal", "ytb");
    // eslint-disable-next-line no-unused-expressions
    window.VK && VK.Retargeting.Event("ytb");
  });
});

const metrikVideo = [...document.querySelectorAll("._icon-play")];
metrikVideo.forEach((element) => {
  element.addEventListener("click", () => {
    // eslint-disable-next-line no-unused-expressions
    window.ym && ym(87892948, "reachGoal", "vid");
    // eslint-disable-next-line no-unused-expressions
    window.VK && VK.Retargeting.Event("vid");
  });
});

const metrikFaq = [...document.querySelectorAll(".accordion__item")];
metrikFaq.forEach((element) => {
  element.addEventListener("click", (event) => {
    if (event.currentTarget.classList.contains("is-active")) {
      // eslint-disable-next-line no-unused-expressions
      window.ym && ym(87892948, "reachGoal", "faq");
      // eslint-disable-next-line no-unused-expressions
      window.VK && VK.Retargeting.Event("faq");
    }
  });
});
