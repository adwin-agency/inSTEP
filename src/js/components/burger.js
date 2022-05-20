import determineScrollWidth from "../utils/determiningScrollWidth.js";

export default class Burger {
  constructor({ burger, menu }) {
    this.burger = burger;
    this.menu = menu;
    this.listener();
  }

  toggle() {
    this.menu.classList.toggle("_active");
    this.burger.classList.toggle("_active");
    document.body.classList.toggle("_fixed");

    // if (this.menu.classList.contains("_active")) {
    //   document.body.style.paddingRight = `${determineScrollWidth()}px`;
    // } else {
    //   document.body.style.paddingRight = "";
    // }
  }

  listener() {
    this.burger.addEventListener("click", this.toggle.bind(this));
  }
}
