// ====================== LAZY-LOADING ======================
export default class Observer {
  constructor({
    element,
    rootMargin,
    playOnce,
    updateFrequency,
    activeClass,
    imageLoad,
  }) {
    this.element = element;
    this.rootMargin = rootMargin || "0px";
    this.playOnce = playOnce || false;
    this.updateFrequency = updateFrequency || 20;
    this.activeClass = activeClass || "_active";
    this.imageLoad = imageLoad;

    this.entries = null;
    this.observer = null;

    if (!this.element) {
      return;
    }

    this.observe();

    if (this.imageLoad) {
      this.setBaseImageStyle();
    }
  }

  _thresholdArray() {
    return Array(this.updateFrequency + 1)
      .fill(0)
      .map((item, index) => index / this.updateFrequency || 0);
  }

  _handleIntersect(entries) {
    [this.entries] = entries;
    this.inObject();
    if (this.playOnce) {
      this.unobserve();
    }
  }

  observe() {
    this.observer = new IntersectionObserver(this._handleIntersect.bind(this), {
      threshold: this._thresholdArray(),
      rootMargin: this.rootMargin,
    });
    this.observer.observe(this.element);
  }

  unobserve() {
    const destroyWatcher = () => {
      this.observer.unobserve(this.element);
      this.element.removeEventListener("transitionend", destroyWatcher);
    };
    this.element.addEventListener("transitionend", destroyWatcher);
  }

  addClass() {
    this.element.classList.add(this.activeClass);
  }

  removeClass() {
    this.element.classList.remove(this.activeClass);
  }

  setImageSrc() {
    const { src } = this.element.dataset;
    let srcset = null;
    if (this.element.dataset.srcset) {
      srcset = this.element.dataset.srcset;
      this.element.setAttribute("srcset", srcset);
    }

    this.element.setAttribute("src", src);

    this.element.onload = () => {
      this.observer.unobserve(this.element);
      this.element.removeAttribute("data-src");
      if (srcset) {
        this.element.removeAttribute("data-srcset");
      }
      this.element.dataset.lazy = "done";
      this.setActiveImageStyle();
    };

    this.element.onerror = () => {
      this.element.dataset.lazy = "error-loading";
      this.observer.unobserve(this.element);
    };
  }

  setBaseImageStyle() {
    this.element.style.transition = "1.5s";
    this.element.style.opacity = 0;
  }

  setActiveImageStyle() {
    this.element.style.opacity = 1;
  }

  inObject() {
    if (this.entries.isIntersecting) {
      this.addClass();
      if (this.imageLoad) {
        this.setImageSrc();
      }
    }
  }
}
