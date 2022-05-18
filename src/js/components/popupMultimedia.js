import Popups from "./popup.js";

export default class PopupMultimedia extends Popups {
  constructor(options) {
    const { openAttribute, closeAttribute, popupsAttribute } = options;
    super({ openAttribute, closeAttribute, popupsAttribute });
  }

  searchUrl() {}
}
