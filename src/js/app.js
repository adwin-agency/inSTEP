/* eslint-disable no-unused-vars */
import Accordion from "accordion-js";
import * as Swipers from "./components/swiper.js";
import Burger from "./components/burger.js";
import BURGER_CONSTANT from "./constants/burgerConst.js";

const burger = new Burger(BURGER_CONSTANT);

const faqAcc = new Accordion(".faq__body", {
  onlyChildNodes: false,
});
