import ImagePreloader from './ImagePreloader';
import ModalController from './ModalController';
import MobileNav from './MobileNav';

import Product from './Product';
import Cart from './Cart';

/**
  * Baking Supply Co. App Constructor
  *
  */
class App {
  constructor() {
    this.elems = {
      $site : document.getElementById('app'),
    };

    new ImagePreloader();
    new ModalController();
    new MobileNav();

    /**
      * Route-specific scripts
      *
      **/
    this.product  = (document.getElementById('product')) ? new Product(this.elems) : false;
    this.cart     = (document.getElementById('cart')) ? new Cart(this.elems) : false;

  }
}

const BSCo  = new App();
window.BSCo = BSCo;

export default App;
