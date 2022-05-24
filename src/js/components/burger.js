import determineScrollWidth from "../utils/determiningScrollWidth.js";

export default class Burger {
  constructor({ burger, menu }) {
    this.burger = burger;
    this.menu = menu;
    this.listener();
    this.closeToLinkClick(); // Хардкод
  }

  toggle() {
    this.menu.classList.toggle("_active");
    this.burger.classList.toggle("_active");
    document.body.classList.add("_fixed");
    if (document.body.classList.contains("_fixed")) {
      document.body.classList.remove("_fixed");
    }
  }

  // Хардкод
  closeToLinkClick() {
    const links = this.menu.querySelectorAll(".header__link");
    // eslint-disable-next-line no-restricted-syntax
    for (const link of links) {
      link.addEventListener("click", () => {
        this.menu.classList.remove("_active");
        this.burger.classList.remove("_active");
        if (document.body.classList.contains("_fixed")) {
          document.body.classList.remove("_fixed");
        }
      });
    }
  }

  listener() {
    this.burger.addEventListener("click", this.toggle.bind(this));
  }
}
