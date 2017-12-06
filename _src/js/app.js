import ImagePreloader from './ImagePreloader';
import MobileNav from './MobileNav';

import Product from './product';

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

    this.Product = (document.getElementById('product')) ? new Product(this.elems) : false;
    
  }
}

const BSCo  = new App();
window.BSCo = BSCo;

export default App;
