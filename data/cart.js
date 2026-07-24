export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
  });}

  saveToStorage();
}

export function addCartQuantity(prod) {
  // only posses the quantity.
  let Quantity = document.querySelector(`.js-quantity-selector-${prod}`);
  let QuantityValue = Number(Quantity.value);

  // console.log(QuantityValue);
  
  let cartQuantity = 0;
  cart.forEach((item) => {
      cartQuantity += item.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantity}`;
}

export function removeFromCart(deleteId) {
  const result = cart.filter(data => data.productId !== deleteId);
  cart = result;

  saveToStorage();
}