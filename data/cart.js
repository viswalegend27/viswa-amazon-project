export const cart = [];

export function addToCart(prod) {
  let matchingItem;
  cart.forEach((item) => {
    if (prod === item.productId) {
        matchingItem = item;
    }
  });
  if(matchingItem) {
    matchingItem.quantity += 1;
  } else {
  cart.push(
  {
    productId : prod,
    quantity : 1
  })}
}

export function addCartQuantity(prod) {
  // only posses the quantity.
  let itemQuantity = document.querySelector(`.js-quantity-selector-${prod}`);
  let itemQNumber = Number(itemQuantity.value);

  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += itemQNumber; 
  });

  document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantity}`;
}