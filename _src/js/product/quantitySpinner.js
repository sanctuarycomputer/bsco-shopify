class QuantitySpinner {
  constructor(elems) {
    this.elems = elems;

    this.elems.quantity = {
      increments: document.querySelector('.quantity-increment'),
      decrements: document.querySelector('.quantity-decrement'),
    };

    this.elems.quantity.increments.addEventListener('click', (e) => {
      this.update(e, 'increment');
    });
    this.elems.quantity.decrements.addEventListener('click', (e) => {
      this.update(e, 'decrement');
    });
  }

  update(e, action) {
    const $this     = e.currentTarget;
    const product   = $this.dataset.product;
    const $quantity = document.getElementById(`quantity-${product}`);
    const $target   = document.getElementById(`quantity-target-${product}`);
    const quantity  = (action == 'increment') ? this.increment($quantity.value) : this.decrement($quantity.value);

    $quantity.setAttribute('value', quantity);
    $target.innerHTML = quantity;

  }

  increment(value) {
    const quantity = parseInt(value);
    return quantity + 1;
  }

  decrement(value) {
    const quantity = parseInt(value);

    if (quantity <= 1) return quantity;
    return quantity - 1;
  }
}

export default QuantitySpinner;
