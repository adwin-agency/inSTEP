import determineScrollWidth from "../utils/determiningScrollWidth.js";

export default class Popups {
  constructor(options) {
    const { openAttribute, closeAttribute, popupsAttribute } = options;
    this.openAttribute = openAttribute;
    this.closeAttribute = closeAttribute;
    this.popupsAttribute = popupsAttribute;
    this.openButtons = [...document.querySelectorAll(`[${openAttribute}]`)];
    this.closeButtons = [...document.querySelectorAll(`[${closeAttribute}]`)];
    this.popups = [...document.querySelectorAll(`[${popupsAttribute}]`)];
    this.setListener();
  }

  clickedAttributes(button) {
    this.buttonAttribute = button.dataset;
  }

  findOpenPopup(target) {
    const findPopup = this.popups.find(
      (popup) =>
        popup.getAttribute(this.popupsAttribute) ===
        target.getAttribute(this.openAttribute)
    );
    return findPopup || null;
  }

  findClosePopup(target) {
    const findPopup = this.popups.find(
      (popup) =>
        popup.getAttribute(this.popupsAttribute) ===
        target.getAttribute(this.closeAttribute)
    );
    return findPopup || null;
  }

  openEvent(event) {
    const { target } = event;
    const popup = this.findOpenPopup(target);
    if (popup) {
      this.clickedAttributes(target);
      this.open(popup);
    }
  }

  closeEvent(event) {
    const { target } = event;
    const popup = this.findClosePopup(target);
    if (popup) {
      this.close(popup);
    }
  }

  close(element) {
    element.classList.remove("_open");
    document.body.classList.remove("_fixed");
    document.body.style.paddingRight = "";
    document.querySelector("header").style.paddingRight = ``;
  }

  open(element) {
    element.classList.add("_open");
    document.body.classList.add("_fixed");
    document.body.style.paddingRight = `${determineScrollWidth()}px`;
    document.querySelector(
      "header"
    ).style.paddingRight = `${determineScrollWidth()}px`;
  }

  setListener() {
    this.closeButtons.forEach((button) => {
      button.addEventListener("click", this.closeEvent.bind(this));
    });
    this.openButtons.forEach((button) => {
      button.addEventListener("click", this.openEvent.bind(this));
    });
  }
}
