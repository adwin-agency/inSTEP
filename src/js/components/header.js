import throttle from "../utils/throttle.js";

export default class Header {
  constructor(options) {
    const { header } = options;
    this.header = header;
    this.oldScrollTopPosition = document.documentElement.scrollTop;

    this.listener();
  }

  determiningDdirection() {
    const scrollTopPosition = document.documentElement.scrollTop;

    if (scrollTopPosition < this.header.offsetHeight) {
      this.show();
      this.notScrolling();
      return;
    }

    this.isScrolling();

    if (!document.body.classList.contains("_fixed")) {
      // eslint-disable-next-line no-unused-expressions
      this.oldScrollTopPosition > scrollTopPosition ? this.show() : this.hide();
      this.oldScrollTopPosition = scrollTopPosition;
    }
  }

  show() {
    this.header.classList.remove("_hide");
  }

  hide() {
    this.header.classList.add("_hide");
  }

  isScrolling() {
    this.header.classList.add("_scroll");
  }

  notScrolling() {
    this.header.classList.remove("_scroll");
  }

  listener() {
    const optimizedHandler = throttle(
      this.determiningDdirection.bind(this),
      150
    );
    document.addEventListener("scroll", optimizedHandler);
  }
}
