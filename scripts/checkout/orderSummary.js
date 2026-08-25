import * as Cart from "../../data/cart.js";
import * as Product from '../../data/products.js'
import * as Money from "../utils/money.js";
import * as DeliveryOption from '../../data/deliveryOptions.js'
import { paymentSummary } from "./paymentSummary.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = dayjs();
const weekDay = today.day();

let isWeekend = (weekDay === 6 || weekDay === 0)

function isWeekEnd(item) {
  let date = '';
  let dayVal = today.add(item, 'days').day();
  if(!isWeekend){
    if (dayVal === 6) {
        dayVal = today.add(item + 2, 'days').day();
    }
    if (dayVal === 0) {
        dayVal = today.add(item + 1, 'days').day();
    }
    console.log(today.day(dayVal).format('dddd, MMMM DD'));
  }
  return date = today.day(dayVal).format('dddd, MMMM DD');
}

export function renderOrderSummary() {

  let checkoutHTML = '';
  let deliveryHTML = '';

  function summaryGeneration() {
  	Cart.cart.forEach((cartItem) => {
  		const { productId, deliveryOptionId, quantity } = cartItem;
  		const product = Product.getProductId(cartItem);
  		const { id, image, name, priceCents } = product;
  		const { deliveryDays } = DeliveryOption.deliveryOption(deliveryOptionId);
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
              Quantity: <span class="quantity-label js-quantity-label" data-product-id="${id}">${quantity}</span>
            </span>
            
            <span class="update-quantity-link link-primary js-update-quantity">
              Update
            </span>

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

  	return checkoutHTML;
  }
  document.querySelector('.js-order-summary').innerHTML = summaryGeneration();

  // setting up the delivery-options 
  function setDelivery(cartDeliveryId, productId) {
    let deliveryHTML = '';
    DeliveryOption.deliveryOptions.forEach((item) => {
    let isChecked = cartDeliveryId === item.id;
    const price = Money.formatCurrency(item.priceCents);
    let moneyPrice = price > 0 ? `$${price} - Shipping` : 'FREE SHIPPING';
    deliveryHTML += `
    <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${item.id}">
      <input type="radio" class="delivery-option-input" name="delivery-option-${productId}" ${isChecked ? 'checked' : ''}>
      <div>
        <div class="delivery-option-date">
          ${isWeekEnd(item.deliveryDays)}
        </div>
        <div class="delivery-option-price">
          ${moneyPrice}
        </div>
      </div>
    </div>
    `});
    return deliveryHTML
  }

  // removing item code
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const deleteId = link.dataset.productId;
      Cart.removeFromCart(deleteId);
      const deletedElement = document.querySelector(`.js-cart-item-container-${deleteId}`);
      document.querySelector('.js-checkout-items').innerHTML = `${Cart.overallQuantity()} items`;
      deletedElement.remove();
      paymentSummary();
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
      renderOrderSummary();
    });
  });
  
  // checking-dynamic delivery-option.
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      Cart.updateDeliveryOptionId(productId, deliveryOptionId);
      renderOrderSummary();
      paymentSummary();
    });
  });
}
