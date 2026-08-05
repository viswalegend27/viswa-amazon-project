import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, 
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499 
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}
];

export function deliveryOption(cartItem) {
  let matchingItem;

  deliveryOptions.forEach((item) => {
    if(item.id === cartItem) {
      matchingItem = item;
    }
  });

  return matchingItem;
}

// add delivery-cost to total
export function getDeliveryCost(totalPrice, deliveryOptionId) {
  let nonAvailable;
  let deliveryTotal = 
  deliveryOptions.forEach((item) => {
    if(item.id === deliveryOptionId) {
      totalPrice += item.priceCents;
    }
  });

  return totalPrice || (nonAvailable = deliveryOptions[0]);
}