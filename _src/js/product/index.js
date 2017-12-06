import QuantitySpinner from './QuantitySpinner';

class Product {
  constructor(elems) {
    this.elems = elems;

    this.elems.product = {
      $product: document.getElementById('product'),
    };

    this.props = {
      id: this.elems.product.$product.dataset.product,
    }

    this.Quantity = new QuantitySpinner(this.elems);
  }
}

export default Product;
