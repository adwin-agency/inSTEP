import maskPhone from "../utils/phoneMask.js";

const FORM_CONST = {
  tooShort: "Недостаточно символов",
  valueMissing: "Обязательное поле",
  typeMismatch: "Неверный формат",
  notChecked: "Пропущен флаг",
  mainErrorClass: "_error",
  loaderClass: "_loader_active",
  dataWrapper: "[data-form-input-js]", // Дата атрибут для оболочки инпута
  dataErrorText: "[data-form-error-js]", // Дата атрибут для поля куда выводится текст ошибки
  dataLoader: "[data-form-loader-js]", // Дата атрибут лоадера
  URL: "", // URL по которому отправляется форма
};

export default class Form {
  constructor(options) {
    const { forms, popup, donePopup } = options;
    this.forms = forms;

    this.popup = popup; // хардкод (см onSuccess)
    this.donePopup = donePopup; // хардкод (см onSuccess)

    this.formIsValid = false;
    this.formHandler();
  }

  formHandler = () => {
    this.forms.forEach((form) => {
      // Ставим слушатели
      const button = form.querySelector("button");
      this._listener(form, button);
      // Ставим маску на телефон
      const tel = form.querySelector('input[type="tel"]');
      maskPhone(tel);
    });
  };

  eventHandler = (event) => {
    const { target } = event;
    this.checkInputValidity(target);
  };
  checkInputValidity = (input) => {
    const { tooShort, valueMissing, typeMismatch, notChecked } = FORM_CONST;
    switch (true) {
      case input.validity.tooShort:
        this.setInputError(input, tooShort);
        break;
      case input.validity.valueMissing:
        this.setInputError(input, valueMissing);
        break;
      case input.validity.typeMismatch:
        this.setInputError(input, typeMismatch);
        break;
      case !input.checked && input.type === "checkbox":
        this.setInputError(input, notChecked);
        break;
      case input.value.length < 18 && input.type === "tel":
        this.setInputError(input, tooShort);
        break;
      default:
        this.removeInputError(input);
        break;
    }
  };

  setInputError(input, text) {
    const { dataWrapper, dataErrorText } = FORM_CONST;

    const wrapper = input.closest(dataWrapper);
    let errorText = null;

    if (wrapper) {
      this.addErrorClass(wrapper);
      errorText = wrapper.querySelector(dataErrorText);
      errorText ? (errorText.textContent = text) : null;
    } else {
      this.addErrorClass(input);
    }
  }
  removeInputError(input) {
    const { dataWrapper } = FORM_CONST;
    const wrapper = input.closest(dataWrapper);
    if (wrapper) {
      this.removeErrorClass(wrapper);
    }
  }

  addErrorClass(el) {
    const { mainErrorClass } = FORM_CONST;
    el.classList.add(mainErrorClass);
  }

  removeErrorClass(el) {
    const { mainErrorClass } = FORM_CONST;
    el.classList.remove(mainErrorClass);
  }

  serializeForm(formNode) {
    const formData = new FormData(formNode);
    return formData;
  }

  toggleLoader(formNode) {
    const { dataLoader, loaderClass } = FORM_CONST;

    const loader = formNode.querySelector(dataLoader);
    const submitButton = formNode.querySelector("button");

    loader.classList.toggle(loaderClass);
    loader.classList.contains(loaderClass)
      ? (submitButton.disabled = true)
      : (submitButton.disabled = false);
  }

  metrics() {}

  onSuccess(formNode) {
    this.metrics();
    formNode.reset();

    this.popup.classList.remove("_open"); // Хардкод
    this.donePopup.classList.add("_open"); // Хардкод
  }

  onError(formNode, error) {
    const button = formNode.querySelector("button");
    button.setAttribute("data-button-error", "Ошибка отправки");
    return error?.message ? console.error(error.message) : null;
  }

  async sendData(data) {
    const { URL } = FORM_CONST;

    return fetch(`${URL}/`, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    });
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    if (!this.formIsValid) {
      return;
    }

    const data = this.serializeForm(event.target);

    this.toggleLoader(event.target);
    const { status, error } = await this.sendData(data);
    this.toggleLoader(event.target);

    if (status === 404) {
      this.onSuccess(event.target);
    } else {
      this.onError(event.target, error);
    }
  }

  checkFormValidity = (event) => {
    const { target } = event;
    const formNode = target.form;
    const { elements } = formNode;
    const button = formNode.querySelector("button");

    this.formIsValid = formNode.checkValidity();
    button.disabled = !this.formIsValid;

    button.removeAttribute("data-button-error");

    if (!this.formIsValid) {
      Array.from(elements).forEach((input) => {
        this.checkInputValidity(input);
      });
    }
  };

  _listener(form, submitButton) {
    form.addEventListener("input", (event) => {
      this.checkFormValidity(event);
      this.eventHandler(event);
    });
    submitButton.addEventListener("click", this.checkFormValidity);
    form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }
}
