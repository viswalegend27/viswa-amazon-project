import * as Cart from "../data/cart.js";
import * as Product from '../data/products.js'
import * as Money from "./utils/money.js";

let checkoutHTML = '';

Cart.cart.forEach((cartItem) => {

  const { productId } = cartItem;
  // console.log(cartItem);
  const index = Product.products.findIndex(item => item.id === productId);
  const product = Product.products[index];
  checkoutHTML +=
  `
  <div class="cart-item-container js-cart-item-container-${product.id}">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image" src='${product.image}'>

    <div class="cart-item-details">
      <div class="product-name">
        ${product.name}
      </div>
      <div class="product-price">
        $${Money.formatCurrency(product.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label js-quantity-label" data-product-id="${product.id}">${cartItem.quantity}</span>
        </span>
        
        <span class="update-quantity-link link-primary js-update-quantity">
          Update
        </span>

        <!-- Quantity input -->

        <input type="number" name="quantity" class="quantity-input">
        <span class="save-quantity-link link-primary">Save</span>

        <span class="delete-quantity-link link-primary js-delete-link " data-product-id="${product.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  `;
  
});



document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

// removing item code
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const deleteId = link.dataset.productId;
    Cart.removeFromCart(deleteId);

    const deletedElement = document.querySelector(`.js-cart-item-container-${deleteId}`);
    document.querySelector('.js-checkout-items').innerHTML = `${Cart.cart.length} items`;

    deletedElement.remove();
  });
})

document.querySelector('.js-checkout-items').innerHTML = `${Cart.cart.length} items`;

document.querySelectorAll('.js-update-quantity').forEach((quantity) => {
  quantity.addEventListener('click', () => {
    quantity.style.display = 'none';
    const cartItem = quantity.closest('.product-quantity');
    cartItem.querySelector('.quantity-input').style.display = 'block';
    cartItem.querySelector('.save-quantity-link').style.display = 'block';
  });
});

document.querySelectorAll('.save-quantity-link').forEach((savedQuantity) => {
  const cartItem = savedQuantity.closest('.product-quantity');
  savedQuantity.addEventListener('click', () => {
    let quantityInp = Number(cartItem.querySelector('.quantity-input').value);
    const itemId = cartItem.querySelector('.js-quantity-label');
    // console.log(itemId.dataset.productId);
    Cart.changedQuantity(itemId.dataset.productId, quantityInp);
  })
});