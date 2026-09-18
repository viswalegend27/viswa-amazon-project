class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() { 
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [
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
  }

  saveToStorage() { 
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) { 
    let matchingItem;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  }

  removeFromCart(deleteId) { 
    const result = this.cartItems.filter(data => data.productId !== deleteId);
    this.cartItems = result;
    this.saveToStorage();
  }

  updateDeliveryOptionId(productId, deliveryOptionId) { 
    let matchingItem;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    }); 

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  changedQuantity(id, value) { 
    this.cartItems.forEach((item) => {
      if (id === item.productId) {
        item.quantity += value;
      }
    });

    this.saveToStorage();
  }

  overallQuantity() { 
    let count = 0;

    this.cartItems.forEach((item) => {
      count += item.quantity;
    });

    this.saveToStorage();
    return count;
  }

  addCartQuantity(prod) { 
    let Quantity = document.querySelector(`.js-quantity-selector-${prod}`);
    let QuantityValue = Number(Quantity.value);

    this.cartItems.forEach((item) => {
      if (prod === item.productId) {
        item.quantity += (QuantityValue - 1);
      }
    });

    document.querySelector('.js-cart-quantity').innerHTML = `${this.overallQuantity()}`;

    this.saveToStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
