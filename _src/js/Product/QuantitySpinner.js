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
    const $quantity = document.querySelector(`[data-quantity="${product}"`);
    const original  = $quantity.value;
    const $target   = document.getElementById(`quantity-target-${product}`);

    if ($quantity.id.split('_')[0] == 'updates') {
      let updates = {};
      updates[product] = (action == 'increment') ? parseInt(original) + 1 : parseInt(original) - 1;
      
      axios.post('/cart/update.js', {
        updates: updates
      }).then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log('err', error);
      });
    }

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
