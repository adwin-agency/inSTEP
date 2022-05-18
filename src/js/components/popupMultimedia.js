import Popups from "./popup.js";

export default class PopupMultimedia extends Popups {
  constructor(options) {
    const { openAttribute, closeAttribute, popupsAttribute } = options;
    super({ openAttribute, closeAttribute, popupsAttribute });
    this.init();
  }
  init() {
    this.openListeners(this.searchPopupUrl);
  }

  searchPopupUrl(event) {
    const { target } = event;
    const fullHdSrc = target.dataset.urlVideoHd;
    this.setVideoUrl(fullHdSrc);
  }
  setVideoUrl() {
    const popup = this.findOpenPopup(target);
    const video = popup.querySelector("video");
    video.setAttribute("src", fullHdSrc);
  }
  checkingUniqUrl() {}
  playVideo(video) {
    if (!video.classList.contains(playClass)) {
      video.classList.add(playClass);
      video.classList.remove(plauseClass);
      video.play();
    } else {
      video.pause();
      video.classList.add(plauseClass);
      video.classList.remove(playClass);
    }
  }
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
