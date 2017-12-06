const CLASSES = {
  Wrapper: 'modal',
  Active: 'active',
  Contents: 'contents',
  Newsletter: 'newsletter-modal-inner'
};

const NEWSLETTER = {
  StorageKey: 'SEEN_NEWSLETTER',
  Timeout: 3000
};

export default class ModalController {
  constructor() {
    this.modals = document.getElementsByClassName(CLASSES.Wrapper);
    this.bindListeners();

    /* Newsletter Concerns */
    this.newsletterModal = this.findNewsletterModal();
    this.showNewsletterSignupIfNecessary();
  }

  bindListeners() {
    for(let i = 0; i < this.modals.length; i++) {
      this.modals.item(i).addEventListener('click', e => this.handleClick(e));
    }
  }

  handleClick({ target }) {
    if (target.classList.contains(CLASSES.Wrapper)) {
      return target.classList.remove(CLASSES.Active);
    }

    if (target.classList.contains(CLASSES.Contents)) {
      return target.parentNode.classList.remove(CLASSES.Active);
    }
  }

  /* Newsletter Concerns */
  findNewsletterModal() {
    for(let i = 0; i < this.modals.length; i++) {
      if (this.modals.item(i).getElementsByClassName(CLASSES.Newsletter).length) {
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
};
