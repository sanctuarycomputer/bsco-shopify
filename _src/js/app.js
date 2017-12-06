import ImagePreloader from './ImagePreloader';
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
    new MobileNav();

    /**
      * Route-specific scripts
      *
      **/
    this.Product  = (document.getElementById('product')) ? new Product(this.elems) : false;
    this.Cart     = (document.getElementById('cart')) ? new Cart(this.elems) : false;

  }
}

const BSCo  = new App();
window.BSCo = BSCo;

export default App;
