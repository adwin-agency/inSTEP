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

const header = new Header(HEADER_CONSTANT);
const burger = new Burger(BURGER_CONSTANT);
const popup = new Popups(POPUP_CONSTANT);
const popupMultimedia = new PopupMultimedia(POPUP_MULTIMEDIA_CONSTANT);

const faqAcc = new Accordion(".faq__body", {
  onlyChildNodes: false,
});

function serializeForm(formNode) {
  return new FormData(formNode);
}
function toggleLoader() {
  const loader = document.getElementById("loader");
  loader.classList.toggle("hidden");
}
function onSuccess(formNode) {
  alert("Ваша заявка отправлена!");
  formNode.classList.toggle("hidden");
}
function onError(error) {
  alert(error.message);
}
async function sendData(data) {
  return fetch("/api/apply/", {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },
    body: data,
  });
}
async function handleFormSubmit(event) {
  event.preventDefault();
  const data = serializeForm(event.target);

  toggleLoader();

  const { status, error } = await sendData(data);
  toggleLoader();

  if (status === 200) {
    onSuccess(event.target);
  } else {
    onError(error);
  }
}

function checkValidity(event) {
  const formNode = event.target.form;
  const isValid = formNode.checkValidity();
  console.log(isValid);
  formNode.querySelector("button").disabled = !isValid;
}

const applicantForm = document.querySelector(".contact__form");
applicantForm.addEventListener("input", checkValidity);
applicantForm.addEventListener("submit", handleFormSubmit);
