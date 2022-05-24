import Popups from "./popup.js";

// Написать функционал добавления дата атрибутов с кнопки открытия в форму.

export default class PopupForm extends Popups {
  constructor(options) {
    const { openAttribute, closeAttribute, popupsAttribute } = options;
    super({ openAttribute, closeAttribute, popupsAttribute });
    // this.init();
  }

  // init() {
  //   this.openListeners(this.setAttributesToForm);
  //   // this.closeListeners(this.reseteForm);
  // }

  // setAttributesToForm = (event) => {
  //   const { target } = event;
  //   this.buttonAttribute = target.dataset;
  // };

  // reseteForm = (event) => {
  //   const { target } = event;
  //   const popup = this.findClosePopup(target);
  //   if (popup) {
  //     popup.querySelector("form").reset();
  //   }
  // };
}
