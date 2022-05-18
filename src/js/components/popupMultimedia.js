import Popups from "./popup.js";

export default class PopupMultimedia extends Popups {
  constructor(options) {
    const { openAttribute, closeAttribute, popupsAttribute } = options;
    super({ openAttribute, closeAttribute, popupsAttribute });
    this.init();
  }
  init() {
    this.openListeners(this.searchUrl);
  }

  searchUrl(event) {
    const { target } = event;
    const fullHd = target.dataset.urlVideoHd;

    console.log(fullHd, target.dataset);
  }

  playVideo = () => {
    if (!slide.classList.contains(playClass)) {
      slide.classList.add(playClass);
      slide.classList.remove(plauseClass);
      video.play();
    } else {
      video.pause();
      slide.classList.add(plauseClass);
      slide.classList.remove(playClass);
    }
  };
  setAttribute = () => {
    if (video.getAttribute("data-src")) {
      const src = video.getAttribute("data-src");
      video.setAttribute("src", src);
      video.removeAttribute("data-src");
      slide.removeEventListener("click", setAttribute);
    }
  };
  setListener = () => {
    slide.addEventListener("click", setAttribute);
    slide.addEventListener("click", playVideo);
    video.addEventListener("ended", () => slide.classList.remove(playClass));
  };
}
