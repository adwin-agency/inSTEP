/* eslint-disable no-unused-vars */
import Accordion from "accordion-js";
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

const header = new Header(HEADER_CONSTANT);
const burger = new Burger(BURGER_CONSTANT);
const popup = new Popups(POPUP_CONSTANT);
const scrollTo = new ScrollTo();
const popupMultimedia = new PopupMultimedia(POPUP_MULTIMEDIA_CONSTANT);
const popupForm = new PopupForm(POPUP_FORM_CONSTANT);
const form = new Form(FORM_CONSTANT);

const faqAcc = new Accordion(".faq__body", {
  onlyChildNodes: false,
});
