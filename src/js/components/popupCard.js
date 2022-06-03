import Popups from "./popup.js";

const POPUP_CARD_CONST = {
  URL: "/local/templates/protez/data/getGoods.php",
};

// Написать функционал добавления дата атрибутов с кнопки открытия в форму.

export default class PopupCard extends Popups {
  constructor(options, sliderMain, sliderDupl) {
    const {
      openAttribute,
      closeAttribute,
      popupsAttribute,
      infoAttribute,
      mainSlideAttribute,
      duplSlideAttribute,
    } = options;

    super({ openAttribute, closeAttribute, popupsAttribute });

    this.sliderMain = sliderMain;
    this.sliderDupl = sliderDupl;
    this.containerInfo = document.querySelector(`[${infoAttribute}]`);
    this.containerMainSlide = document.querySelector(`[${mainSlideAttribute}]`);
    this.containerDuplSlide = document.querySelector(`[${duplSlideAttribute}]`);

    this.init();
  }

  async init() {
    const data = await this.getUser();

    if (data) {
      this.data = data;
      this.onSuccess();
    } else {
      this.onError(error);
    }
  }
  onSuccess() {
    this.openListeners(this.createCard);
    this.closeListeners(this.clearCard);
  }

  onError(error) {
    console.error(error);
  }

  getUser() {
    return fetch(
      "http://instep.spb.ru/local/templates/protez/data/getGoods.php",
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  async createCard(event) {
    const { id } = event.target.dataset;

    const cardData = this.findCard(this.data, id);
    this.templateCard(cardData);
  }

  findCard(data, id) {
    return data.find((item) => item.id === id);
  }

  reinitItems() {
    this.sliderMain.update();
    this.sliderDupl.update();
  }

  clearCard(event) {
    const { target } = event;
    const popup = this.findClosePopup(target);
    if (popup) {
      this.info.remove();
      this.containerMainSlide.innerHTML = "";
      this.containerDuplSlide.innerHTML = "";
    }
  }

  templateSpecifications = (name, value) => `
      <div class="popup-card__specifications-row">
        <p class="popup-card__specifications-name _txt-s">${name}</p>
        <div class="popup-card__specifications-box">
          <p class="popup-card__specifications-value _txt-s">${value}</p>
        </div>
      </div>
    `;

  templateMainSlide = (src) => {
    const slide = document.createElement("div");
    const img = document.createElement("img");

    slide.classList.add("popup-card__main-slide", "swiper-slide");
    img.classList.add("popup-card__main-slide-content");
    img.src = src;
    slide.appendChild(img);

    return slide;
  };

  templateDuplicateSlide = (src) => {
    const slide = document.createElement("div");
    const img = document.createElement("img");

    slide.classList.add("popup-card__duplicate-slide", "swiper-slide");
    img.classList.add("popup-card_duplicate-slide-content");
    img.src = src;
    slide.appendChild(img);

    return slide;
  };

  templateCard(data) {
    const { spec_name, spec_value, media } = data;

    const templateInfo = `
        <h2 class="popup-card__title _h3">${data.name}</h2>
        <p class="popup-card__text _txt-m">${data.text_short}­</p>

        <div class="popup-card__specifications">
        </div>
       `;

    const info = document.createElement("div");
    this.info = info;

    info.insertAdjacentHTML("beforeend", templateInfo.trim());

    const specification = info.querySelector(".popup-card__specifications");

    spec_name.forEach((name, index) => {
      const item = this.templateSpecifications(
        name,
        spec_value[index] ? spec_value[index] : "-"
      );
      specification.insertAdjacentHTML("beforeend", item.trim());
    });

    media.forEach((slide) => {
      const main = this.templateMainSlide(slide.large.path);
      const duplicate = this.templateDuplicateSlide(slide.small.path);

      this.containerMainSlide.appendChild(main);
      this.containerDuplSlide.appendChild(duplicate);
    });

    this.containerInfo.appendChild(info);

    this.reinitItems();
  }
}
