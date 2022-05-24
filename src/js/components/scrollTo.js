export default class ScrollTo {
  constructor() {
    this.scrollHandler();
  }

  scrollHandler() {
    const headerHeight = document
      .querySelector("header")
      .getBoundingClientRect().height;
    const smoothLinks = document.querySelectorAll("[data-scroll-from]");
    // eslint-disable-next-line no-restricted-syntax
    for (const smoothLink of smoothLinks) {
      smoothLink.addEventListener("click", (e) => {
        e.preventDefault();
        const id = e.target.getAttribute("data-scroll-from");
        const targetY =
          document
            .querySelector(`[data-scroll-to="${id}"]`)
            .getBoundingClientRect().top +
          window.scrollY -
          headerHeight;
        this.smoothScroll(targetY);
      });
    }
  }

  smoothScroll(to) {
    const distance = window.scrollY - to;
    const duration = Math.round((Math.abs(distance) / 1000) * 280);

    const cosParameter = distance / 2;
    let scrollCount = 0;
    let timestamp = null;

    function step(newTimestamp) {
      if (timestamp !== null) {
        scrollCount += (Math.PI * (newTimestamp - timestamp)) / duration;

        if (scrollCount >= Math.PI) {
          return;
        }

        window.scrollTo(
          0,
          to + cosParameter + cosParameter * Math.cos(scrollCount)
        );
      }

      timestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }
}
