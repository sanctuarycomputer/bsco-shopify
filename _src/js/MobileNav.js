const MOBILE_MENU = 'mobile-menu';
const MOBILE_NAV_TOGGLE = 'mobile-nav-toggle';
const ACTIVE_CLASS = 'active';
const DISABLE_SCROLL = 'no-scroll';

export default class MobileNav {
  constructor() {
    this.mobileNavToggle = document.getElementsByClassName(MOBILE_NAV_TOGGLE);
    this.mobileMenu = document.getElementsByClassName(MOBILE_MENU);
    this.initListener();
  }

  initListener() {
    this.mobileNavToggle[0].addEventListener('click', (e) =>  this.toggleClass(e));
  }

  toggleClass() {
    if (this.mobileMenu[0].classList.contains(ACTIVE_CLASS)) {
      return this.removeActiveClass();
    }
    return this.addActiveClass();
  }

  addActiveClass() {
    document.body.classList.add(DISABLE_SCROLL);
    this.mobileMenu[0].classList.add(ACTIVE_CLASS);
  }

  removeActiveClass() {
    document.body.classList.remove(DISABLE_SCROLL);
    this.mobileMenu[0].classList.remove(ACTIVE_CLASS);
  }
}
