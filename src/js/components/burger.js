export default class Burger {
  constructor({
    burger,
    menu,
  }) {
    this.burger = burger;
    this.menu = menu;
    this.listener();
  }

  toggle() {
    this.menu.classList.toggle("_active");
    this.burger.classList.toggle("_active");
  }

  listener() {
    this.burger.addEventListener("click", this.toggle.bind(this));
  }
}
