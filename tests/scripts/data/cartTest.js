import { addToCart, cart, loadFromStorage } from "../../../scripts/data/cart.js";

describe('testing suit: addToCart', () => {
  it('adding existing element', () => {
    spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: '1'
        }]);
      });
      console.log(localStorage.getItem("cart"));
      loadFromStorage();
      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(2);
  });

  it('adding different element', () => {
      // whole code is to fake the localstorage getItem cart and setItem
      spyOn(localStorage, 'setItem');
      spyOn(localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify([]);
      });

      // console.log(localStorage.getItem('cart'));
      loadFromStorage();
      addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.length).toEqual(1);
      // this method used to record/modify the spyOn mocking times.
      console.log(localStorage.getItem("cart"));
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(1);
  });
});