import ImagePreloader from './ImagePreloader';

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

    this.Product = (document.getElementById('product')) ? new Product(this.elems) : false;
  }
}

const BSCo  = new App();
window.BSCo = BSCo;

export default App;
