import axios from 'axios';

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

    const dataSelector  = '[data-quantity="' + product + '"]';
    const $quantity = document.querySelector(dataSelector);
    const original  = $quantity.value;
    const selector  = 'quantity-target-' + product;
    const $target   = document.getElementById(selector);
    const $price   = document.getElementById('product-price');

    if ($quantity.id.split('_')[0] == 'updates') {
      axios.post('/cart/change.js', {
        quantity: (action == 'increment') ? parseInt(original) + 1 : parseInt(original) - 1,
        line: parseInt($quantity.dataset.line)
      }).then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log('err', error);
      });
    }

    const quantity = (action == 'increment') ? this.increment($quantity.value) : this.decrement($quantity.value);    
    const newPrice = '$' + (quantity * $price.dataset.original / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    $quantity.setAttribute('value', quantity);
    $price.innerHTML = newPrice;
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
