import Player from '@vimeo/player';

const CLASSES = {
  Wrapper: 'modal',
  Active: 'active',
  Close: 'close-modal',
  Contents: 'contents',
  Newsletter: 'newsletter-modal-inner',
  Screensaver: 'screensaver-modal-inner',
  Video: 'video-modal-inner',
  VideoTrigger: 'video-trigger',
  VideoContainer: 'video-container',
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
};

const VIDEO = {
  PlayerId: 'video-player',
  Options: {
    autoplay: true,
  }
};

export default class ModalController {
  constructor() {
    this.modals = document.getElementsByClassName(CLASSES.Wrapper);
    this.bindListeners();
    this.bindScreensaverListeners();

    /* Newsletter Concerns */
    this.newsletterModal = this.findModal(CLASSES.Newsletter);
    this.showNewsletterSignupIfNecessary();

    /* Screensaver Concerns */
    this.screensaverModal = this.findModal(CLASSES.Screensaver);
    this.screensaverTimeout = null;
    this.screensaverInit = false;

    /* Video Concerns */
    this.player = null;
    this.videoModal = this.findModal(CLASSES.Video);
    this.videoTrigger = document.getElementsByClassName(CLASSES.VideoTrigger);
    this.initVideoTrigger();
  }

  bindListeners() {
    for(let i = 0; i < this.modals.length; i++) {
      this.modals.item(i).addEventListener('click', e => this.handleClick(e));
    }
  }

  handleClick({ target }) {
    if (this.player) {
      window.removeEventListener('resize', e => this.resizeVideo());
      this.player.unload();
    }

    if (target.classList.contains(CLASSES.Wrapper)) {
      return target.classList.remove(CLASSES.Active);
    }

    if (target.classList.contains(CLASSES.Contents) || 
        target.classList.contains(CLASSES.Close)) {
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

  /* Newsletter Concerns */

  showNewsletterSignupIfNecessary() {
    if (localStorage.getItem(NEWSLETTER.StorageKey) === 'true') return;
    window.setTimeout(() => {
      this.newsletterModal.classList.add(CLASSES.Active);
      localStorage.setItem(NEWSLETTER.StorageKey, 'true');
    }, NEWSLETTER.Timeout);
  }

  /* Screensaver Concerns */

  bindScreensaverListeners() {
    SCREENSAVER.Events.forEach((evt) => {
      document.addEventListener(evt, e => this.handleScreensaverEvent(e));
    });
  }

  handleScreensaverEvent(e) {
    if (this.screensaverModal.classList.contains(CLASSES.Active)) {
      this.screensaverModal.classList.remove(CLASSES.Active);
    }
    this.initScreensaver();
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

  /* Video Concerns */
  initVideoTrigger() {
    if (this.videoTrigger.length) {
      for (let i = 0; i < this.videoTrigger.length; i++) {
        this.videoTrigger[i].addEventListener('click', e => this.setupAndPlayVideo());
      }
    }
  }

  resizeVideo() {
    const videoContainer = document.getElementsByClassName(CLASSES.VideoContainer)[0];
    if (videoContainer) {
      const iframe = videoContainer.getElementsByTagName('iframe')[0];
      const width = iframe.offsetWidth;
      const height = iframe.offsetHeight;

      const targetWidth = videoContainer.offsetWidth;
      const targetHeight = (targetWidth / width) * height;

      iframe.width = targetWidth;
      iframe.height = targetHeight;
    }
  }

  setupAndPlayVideo() {
    this.player = new Player(VIDEO.PlayerId);
    this.videoModal.classList.add(CLASSES.Active);
    this.player.play();
    this.player.setVolume('0.5');
    this.resizeVideo();
    this.initVideoResizeListener();
  }

  initVideoResizeListener() {
    window.addEventListener('resize', e => this.resizeVideo());
  }
};
