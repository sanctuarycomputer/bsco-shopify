const CLASSES = {
  Wrapper: 'modal',
  Active: 'active',
  Contents: 'contents',
  Newsletter: 'newsletter-modal-inner',
  Screensaver: 'screensaver-modal-inner',
};

const NEWSLETTER = {
  StorageKey: 'SEEN_NEWSLETTER',
  Timeout: 3000
};

const SCREENSAVER = {
  Timeout: 60000,
  Events: [
    'touchstart',
    'mousedown',
    'mousemove',
    'touchmove',
    'keypress',
    'scroll',
  ],
}

export default class ModalController {
  constructor() {
    this.modals = document.getElementsByClassName(CLASSES.Wrapper);
    this.bindListeners();
    this.bindScreensaverListeners();

    /* Newsletter Concerns */
    this.newsletterModal = this.findModal(CLASSES.Newsletter);
    this.showNewsletterSignupIfNecessary();
    /* Screensaver Concerns */
    this.screensaverTimeout = null;
    this.screensaverModal = this.findModal(CLASSES.Screensaver);
    this.screensaverInit = false;
  }

  bindListeners() {
    for(let i = 0; i < this.modals.length; i++) {
      this.modals.item(i).addEventListener('click', e => this.handleClick(e));
    }
  }

  bindScreensaverListeners() {
    SCREENSAVER.Events.forEach((evt) => {
      document.addEventListener(evt, e => this.handleScreenSaverEvent(e));
    });
  }

  handleScreenSaverEvent(e) {
    if (this.screensaverModal.classList.contains(CLASSES.Active)) {
      this.screensaverModal.classList.remove(CLASSES.Active);
    }
    this.initScreensaver();
  }

  handleClick({ target }) {
    if (target.classList.contains(CLASSES.Wrapper)) {
      return target.classList.remove(CLASSES.Active);
    }

    if (target.classList.contains(CLASSES.Contents)) {
      return target.parentNode.classList.remove(CLASSES.Active);
    }
  }

  findModal(classname) {
    for(let i = 0; i < this.modals.length; i++) {
      if (this.modals.item(i).getElementsByClassName(classname).length) {
        return this.modals.item(i);
      };
    }
  }

  showNewsletterSignupIfNecessary() {
    if (localStorage.getItem(NEWSLETTER.StorageKey) === 'true') return;
    window.setTimeout(() => {
      this.newsletterModal.classList.add(CLASSES.Active);
      localStorage.setItem(NEWSLETTER.StorageKey, 'true');
    }, NEWSLETTER.Timeout);
  }

  initScreensaver() {
    if (!localStorage.getItem(NEWSLETTER.StorageKey || this.screensaverInit)) return;

    if (this.screensaverTimeout) {
      clearTimeout(this.screensaverTimeout);
    }

    this.screensaverTimeout = window.setTimeout(() => {
      this.screensaverModal.classList.add(CLASSES.Active);
    }, SCREENSAVER.Timeout);
  }
};
