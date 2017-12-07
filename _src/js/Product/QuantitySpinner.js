class QuantitySpinner {
  constructor(elems) {
    this.elems = elems;

    this.elems.quantity = {
      increments: document.querySelectorAll('.quantity-increment'),
      decrements: document.querySelectorAll('.quantity-decrement'),
    };

    Array.from(this.elems.quantity.increments).forEach((increment) => {
      increment.addEventListener('click', (e) => {
        e.preventDefault();
        this.update(e, 'increment');
      });
    });
    Array.from(this.elems.quantity.decrements).forEach((decrement) => {
      decrement.addEventListener('click', (e) => {
        e.preventDefault();
        this.update(e, 'decrement');
      });
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
