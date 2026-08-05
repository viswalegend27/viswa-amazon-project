import * as Cart from "../../data/cart.js";
import * as Product from '../../data/products.js'
import * as Money from "../utils/money.js";
import * as DeliveryOption from '../../data/deliveryOptions.js'

export function paymentSummary() {
	let totalPrice = 0,
		  shippingTotal = 0,
		  shipingPrice = 0;
	Cart.cart.forEach(cartItem => {
		const {
			deliveryOptionId
		} = cartItem;
		const product = Product.getProductId(cartItem);
		const delivery = DeliveryOption.deliveryOption(deliveryOptionId);
		shipingPrice += delivery.priceCents;
		totalPrice += product.priceCents * cartItem.quantity;
		shippingTotal = Money.formatCurrency(DeliveryOption.getDeliveryCost(totalPrice, deliveryOptionId));
	});
	const shipingCost = shipingPrice > 0 ? `$${(Money.formatCurrency(shipingPrice))}` : 'FREE SHIPPING';
	const convertedTotal = Number(Money.formatCurrency(totalPrice));
  const convShippingCost = Number(Money.formatCurrency(shipingPrice));
  const totalBeforeTax = convertedTotal + convShippingCost;
  const taxation = totalBeforeTax * 0.10;
	const totalAmount = totalBeforeTax + taxation;

	document.querySelector('.payment-summary').innerHTML = 
	`
  <div class="payment-summary-row">
    <div>Items (${Cart.overallQuantity()}):</div>
    <div class="payment-summary-money">$${convertedTotal}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">${shipingCost}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${(totalBeforeTax).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${(taxation).toFixed(2)}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${(totalAmount).toFixed(2)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
  `;
}
