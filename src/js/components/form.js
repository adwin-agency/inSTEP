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
    const { form } = options;
    this.form = form;

    this.submitButton = this.form.querySelector("button");
    this.formIsValid = false;
    this.listener();
  }

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

  addErrorClass(el) {
    const { mainErrorClass } = FORM_CONST;
    el.classList.add(mainErrorClass);
  }

  removeErrorClass(el) {
    const { mainErrorClass } = FORM_CONST;
    el.classList.remove(mainErrorClass);
  }

  removeInputError(input) {
    const { dataWrapper } = FORM_CONST;
    const wrapper = input.closest(dataWrapper);
    if (wrapper) {
      this.removeErrorClass(wrapper);
    }
  }

  serializeForm(formNode) {
    const formData = new FormData(formNode);
    return formData;
  }

  toggleLoader() {
    const { dataLoader, loaderClass } = FORM_CONST;
    const loader = this.form.querySelector(dataLoader);

    loader.classList.toggle(loaderClass);
    loader.classList.contains(loaderClass)
      ? (this.submitButton.disabled = true)
      : (this.submitButton.disabled = false);
  }

  metrics() {}

  onSuccess(formNode) {
    this.metrics();
  }

  onError(error) {
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

    this.toggleLoader();
    const { status, error } = await this.sendData(data);
    this.toggleLoader();

    if (status === 200) {
      this.onSuccess(event.target);
    } else {
      this.onError(error);
    }
  }

  checkFormValidity = (event) => {
    const { target } = event;
    const formNode = target.form;
    const { elements } = formNode;

    this.formIsValid = formNode.checkValidity();
    formNode.querySelector("button").disabled = !this.formIsValid;

    if (!this.formIsValid) {
      Array.from(elements).forEach((input) => {
        this.checkInputValidity(input);
      });
    }
  };

  listener() {
    this.form.addEventListener("input", (event) => {
      this.checkFormValidity(event);
      this.eventHandler(event);
    });
    this.submitButton.addEventListener("click", this.checkFormValidity);
    this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
  }
}
