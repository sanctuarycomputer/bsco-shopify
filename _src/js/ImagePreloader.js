import loadImage from 'blueimp-load-image';

const URL_PATTERN   = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const URL_REGEX     = new RegExp(URL_PATTERN);
const PRELOAD_CLASS = 'preload-image';
const LOADED_CLASS  = 'loaded';

export default class ImagePreloader {
  constructor() {
    this.preloadImages = document.getElementsByClassName(PRELOAD_CLASS);
    this.perform();
  }

  perform() {
    for(let i = 0; i < this.preloadImages.length; i++) {
      let el = this.preloadImages.item(i);
      let url = (el.src || el.style.backgroundImage || "").match(URL_REGEX) || [];
      if (!url[0]) continue;
      loadImage(url[0], () => this.showImage(el));
    }
  }

  showImage(el) {
    el.classList.add(LOADED_CLASS);
  }
}

