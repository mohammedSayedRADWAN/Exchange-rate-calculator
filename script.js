/** @format */

const currencyEL1 = document.getElementById('currency-one');
const amountEL1 = document.getElementById('amount-one');
const currencyEL2 = document.getElementById('currency-two');
const amountEL2 = document.getElementById('amount-two');
const swapEL = document.getElementById('swap');
const rateEL = document.getElementById('rate');

//fetch exchange rate
function calculate() {
  const currency_one = currencyEL1.value;
  const currency_two = currencyEL2.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/e550b90904361456b8931b83/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency_two];
      rateEL.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      amountEL2.value = (amountEL1.value * rate).toFixed(2);
    });
}

//Event listner
currencyEL1.addEventListener('change', calculate);
amountEL1.addEventListener('input', calculate);
currencyEL2.addEventListener('change', calculate);
amountEL2.addEventListener('input', calculate);
swapEL.addEventListener('click', () => {
  //swaping without temp variable
  [currencyEL1.value, currencyEL2.value] = [
    currencyEL2.value,
    currencyEL1.value,
  ];
  calculate();
});
calculate();
