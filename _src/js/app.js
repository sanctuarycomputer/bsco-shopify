import ImagePreloader from './ImagePreloader';
import ModalController from './ModalController';
/**
  * Baking Supply Co. App Constructor
  *
  */
class App {
  constructor() {
    new ImagePreloader();
    new ModalController();
  }
}

const BSCo  = new App();
window.BSCo = BSCo;

export default App;
