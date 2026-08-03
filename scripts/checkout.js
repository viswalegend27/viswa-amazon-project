import * as Cart from "../data/cart.js";
import * as Product from '../data/products.js'
import * as Money from "./utils/money.js";
import * as DeliveryOption from '../data/deliveryOptions.js'
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();

function renderOrderSummary() {

  let checkoutHTML = '';
  let deliveryHTML = '';

  Cart.cart.forEach((cartItem) => {

    const { productId, deliveryOptionId } = cartItem;
    // console.log(deliveryOptionId);
    const index = Product.products.findIndex(item => item.id === productId);
    const product = Product.products[index];
    const { id, image, name, priceCents } = product;
    const deliveryIndex = DeliveryOption.deliveryOptions.findIndex(item => item.id === deliveryOptionId);
    const { deliveryDays } = DeliveryOption.deliveryOptions[deliveryIndex];
    const deliveryDate = today.add(deliveryDays, 'days').format('dddd, MMMM DD');

    checkoutHTML +=
    `
    <div class="cart-item-container js-cart-item-container-${id}">
    <div class="delivery-date">
      Delivery date: ${deliveryDate}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image" src='${image}'>

      <div class="cart-item-details">
        <div class="product-name">
          ${name}
        </div>
        <div class="product-price">
          $${Money.formatCurrency(priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label" data-product-id="${id}">${cartItem.quantity}</span>
          </span>
          
          <span class="update-quantity-link link-primary js-update-quantity">
            Update
          </span>

          <!-- Quantity input -->

          <input type="number" name="quantity" class="quantity-input">
          <span class="save-quantity-link link-primary">Save</span>

          <span class="delete-quantity-link link-primary js-delete-link " data-product-id="${id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
          ${setDelivery(deliveryOptionId, id)}
      </div>

    </div>
    </div>
    `;
  });

  function setDelivery(cartDeliveryId, productId) {
    let deliveryHTML = '';
    // console.log(productId);
    DeliveryOption.deliveryOptions.forEach((item) => {
    let isChecked = cartDeliveryId === item.id;
    // console.log(`cart delivery id ${cartDeliveryId}`);
    // console.log(`item id ${item.id}`);
    const price = Money.formatCurrency(item.priceCents);
    let moneyPrice = price > 0 ? `$${price} - Shipping` : 'FREE SHIPPING';
    deliveryHTML += `
    <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${item.id}">
      <input type="radio" class="delivery-option-input" name="delivery-option-${productId}" ${isChecked ? 'checked' : ''}>
      <div>
        <div class="delivery-option-date">
          ${today.add(item.deliveryDays, 'days').format('dddd, MMMM DD')}
        </div>
        <div class="delivery-option-price">
          ${moneyPrice}
        </div>
      </div>
    </div>
    `});
    // console.log(JSON.stringify(Cart.cart, null, 2));
    return deliveryHTML
  }

  document.querySelector('.js-order-summary').innerHTML = checkoutHTML;

  // removing item code
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const deleteId = link.dataset.productId;
      Cart.removeFromCart(deleteId);

      const deletedElement = document.querySelector(`.js-cart-item-container-${deleteId}`);
      document.querySelector('.js-checkout-items').innerHTML = `${Cart.overallQuantity()} items`;

      deletedElement.remove();
    });
  })

  // calculating the overall quantity
  document.querySelector('.js-checkout-items').innerHTML = `${Cart.overallQuantity()} items`;

  // updating the quantity
  document.querySelectorAll('.js-update-quantity').forEach((quantity) => {
    const cartItem = quantity.closest('.product-quantity');
    quantity.addEventListener('click', () => {
      quantity.style.display = 'none';
      cartItem.querySelector('.quantity-input').style.display = 'block';
      cartItem.querySelector('.save-quantity-link').style.display = 'block';
    });
  });

  // calculating the quantity
  document.querySelectorAll('.save-quantity-link').forEach((savedQuantity) => {
    const cartItem = savedQuantity.closest('.product-quantity');
    savedQuantity.addEventListener('click', () => {
      let quantityInp = Number(cartItem.querySelector('.quantity-input').value);
      const itemId = cartItem.querySelector('.js-quantity-label');
      Cart.changedQuantity(itemId.dataset.productId, quantityInp);
    })
  });

  // checking- dynamic delivery-option.
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      Cart.updateDeliveryOptionId(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}

renderOrderSummary();