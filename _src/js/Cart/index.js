import QuantitySpinner from './../Product/quantitySpinner';

class Cart {
  constructor(elems) {
    this.elems = elems;

    this.Quantity = new QuantitySpinner(this.elems);
  }
}

export default Cart;
