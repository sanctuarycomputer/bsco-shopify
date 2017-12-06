import ImagePreloader from './ImagePreloader';
import MobileNav from './MobileNav';
/**
  * Baking Supply Co. App Constructor
  *
  */
class App {
  constructor() {
    new ImagePreloader();
    new MobileNav();
  }
}

const BSCo  = new App();
window.BSCo = BSCo;

export default App;
