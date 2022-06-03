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

    this.openListeners(this.openEvent);
    this.closeListeners(this.closeEvent);

    this.currentPopup = null;
    this.previousPopup = null;
  }

  findOpenPopup(target) {
    const findPopup = this.popups.find(
      (popup) => popup.getAttribute(this.popupsAttribute)
        === target.getAttribute(this.openAttribute),
    );
    return findPopup || null;
  }

  findClosePopup(target) {
    const findPopup = this.popups.find(
      (popup) => popup.getAttribute(this.popupsAttribute)
        === target.getAttribute(this.closeAttribute),
    );
    return findPopup || null;
  }

  openEvent(event) {
    const { target } = event;
    const popup = this.findOpenPopup(target);
    if (popup) {
      this.currentPopup = popup;
      // Задержка при открытии поапа в попапе(без нее сбрасывается лок скрола)
      setTimeout(() => {
        this.open(popup);
      }, 0);
    }
  }

  closeEvent(event) {
    const { target } = event;
    const popup = this.findClosePopup(target);
    if (popup) {
      this.previousPopup = popup;
      this.close(popup);
    }
  }

  close(element) {
    document.body.style.paddingRight = "0px";
    element.classList.remove("_open");
    document.body.classList.remove("_fixed");
  }

  open(element) {
    document.body.style.paddingRight = `${determineScrollWidth()}px`;
    element.classList.add("_open");
    document.body.classList.add("_fixed");
  }

  openListeners(func) {
    this.openButtons.forEach((button) => {
      button.addEventListener("click", func.bind(this));
    });
  }

  closeListeners(func) {
    this.closeButtons.forEach((button) => {
      button.addEventListener("click", func.bind(this));
    });
  }
}
