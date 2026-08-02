export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '3'
  }
];


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
        matchingItem = item;
    }
  });
  if(matchingItem) {
    matchingItem.quantity += 1;
  } else {
  cart.push(
  {
    productId : productId,
    quantity : 1,
    deliveryOptionId: '1'
  });}

  saveToStorage();
}

export function toggleAddedToCart(btn) {
  const addedToCart = btn.parentElement;
  // if clicked show is been added
  addedToCart.querySelector('.js-added-to-cart').classList.add('show');
  setTimeout(() => {
    addedToCart.querySelector('.js-added-to-cart').classList.remove('show');
  },1500);
}

export function addCartQuantity(prod) {
  let Quantity = document.querySelector(`.js-quantity-selector-${prod}`);
  let QuantityValue = Number(Quantity.value);

  cart.forEach((item) => {
    if (prod === item.productId) {
      item.quantity += (QuantityValue - 1);
    }
  })

  document.querySelector('.js-cart-quantity').innerHTML = `${overallQuantity()}`;
  
  saveToStorage();
}

export function changedQuantity(id, value) {
  cart.forEach((item) => {
    if(id === item.productId) {
      item.quantity += value;
    }
  })

  saveToStorage();
}

export function overallQuantity() {
  let count = 0
  cart.forEach((item) => {
    count += item.quantity;
  });
  saveToStorage();
  return count;
}

export function removeFromCart(deleteId) {
  const result = cart.filter(data => data.productId !== deleteId);
  cart = result;

  saveToStorage();
}

export function updateDeliveryOptionId(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  }); 
  matchingItem.deliveryOptionId = deliveryOptionId;
  console.log(deliveryOptionId);
  console.log(matchingItem)
  saveToStorage();
}