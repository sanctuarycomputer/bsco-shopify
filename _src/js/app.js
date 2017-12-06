import ImagePreloader from './ImagePreloader';
import ModalController from './ModalController';
import MobileNav from './MobileNav';
/**
  * Baking Supply Co. App Constructor
  *
  */
class App {
  constructor() {
    new ImagePreloader();
    new ModalController();
    new MobileNav();
  }
}

const BSCo  = new App();
window.BSCo = BSCo;

export default App;
