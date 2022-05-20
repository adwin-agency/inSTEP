import Popups from "./popup.js";

const POPUP_MULTIMEDIA_CLASSES = {
  videoOnload: "_video-onload",
  videoError: "_video-onerror",
  imageOnload: "_image-onload",
  imageError: "_image-onerror",
  consoleImageError: "The image cannot be uploaded",
  consoleVideoError: "The video cannot be uploaded",
  consoleAttributeError: "↓ Не найдены дата атрибуты с src у элемента ↓",
};

export default class PopupMultimedia extends Popups {
  constructor(options) {
    const { openAttribute, closeAttribute, popupsAttribute } = options;
    super({ openAttribute, closeAttribute, popupsAttribute });
    this.init();
  }

  init() {
    this.openListeners(this.searchPopupUrl);
    this.closeListeners(this.pauseVideo);
  }

  searchPopupUrl(event) {
    const { target } = event;
    const { consoleAttributeError } = POPUP_MULTIMEDIA_CLASSES;

    const videoSrc = target.dataset.urlVideo;
    const imageSrc = target.dataset.urlImage;

    if (videoSrc) {
      this.setVideoUrl(target, videoSrc);
    } else if (imageSrc) {
      this.setImageUrl(target, imageSrc);
    } else {
      console.error(consoleAttributeError);
      console.dir(target);

      const popup = this.findOpenPopup(target);

      if (popup) {
        this.close(popup);
      }
    }
  }

  setVideoUrl(target, src) {
    const popup = this.findOpenPopup(target);
    const video = popup.querySelector("video");
    const videoSrc = video.getAttribute("src");

    this.popup = popup;
    this.video = video;

    if (!this.checkingUniqUrl(videoSrc, src)) {
      this.clearClass();
      video.setAttribute("src", src);
      this.videoLoad(video);
    }
    this.playVideo();
  }

  setImageUrl(target, src) {
    const popup = this.findOpenPopup(target);
    const image = popup.querySelector("img");
    const imageSrc = image.getAttribute("src");

    this.popup = popup;

    if (!this.checkingUniqUrl(imageSrc, src)) {
      this.clearClass();
      this.imageLoad(image);
      image.setAttribute("src", src);
    }
  }

  playVideo() {
    this.video.play();
  }

  pauseVideo() {
    if (this.popup && this.video) {
      this.video.pause();
    }
  }

  checkingUniqUrl(currentUrl, newUrl) {
    return currentUrl === newUrl;
  }

  videoLoad(video) {
    const { consoleVideoError, videoError, videoOnload } =
      POPUP_MULTIMEDIA_CLASSES;

    video.addEventListener("loadeddata", () => {
      if (video.readyState >= 2) {
        this.addError(this.popup, videoOnload);
        video.play();
      }
    });

    // eslint-disable-next-line no-param-reassign
    video.onerror = () => {
      this.addError(this.popup, videoError);
      console.error(consoleVideoError);
    };
  }

  imageLoad(image) {
    const { consoleImageError, imageOnload, imageError } =
      POPUP_MULTIMEDIA_CLASSES;

    // eslint-disable-next-line no-param-reassign
    image.onload = () => {
      this.addError(this.popup, imageOnload);
    };

    // eslint-disable-next-line no-param-reassign
    image.onerror = () => {
      this.addError(this.popup, imageError);
      console.error(consoleImageError);
    };
  }

  clearClass() {
    const { imageOnload, imageError, videoError, videoOnload } =
      POPUP_MULTIMEDIA_CLASSES;

    this.removeError(
      this.popup,
      imageOnload,
      imageError,
      videoError,
      videoOnload
    );
  }

  addError(element, ...error) {
    element.classList.add(...error);
  }

  removeError(element, ...error) {
    element.classList.remove(...error);
  }
}