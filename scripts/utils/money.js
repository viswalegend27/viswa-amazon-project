export function formatCurrency(prodPrice){
  return Number((Math.round(prodPrice) / 100).toFixed(2));
}

export default formatCurrency;