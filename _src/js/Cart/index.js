import QuantitySpinner from './../Product/QuantitySpinner';

class Cart {
  constructor(elems) {
    this.elems = elems;

    this.Quantity = new QuantitySpinner(this.elems);
  }
}

export default Cart;
