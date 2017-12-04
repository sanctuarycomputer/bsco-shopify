import ImagePreloader from './ImagePreloader';
/**
  * Baking Supply Co. App Constructor
  *
  */
class App {
  constructor() {
    new ImagePreloader();
  }
}

const BSCo  = new App();
window.BSCo = BSCo;

export default App;
