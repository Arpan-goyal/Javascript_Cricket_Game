const BASE_URL = `https://v6.exchangerate-api.com/v6/eca19af0db8f0a17c35f64d8/latest/`;

const dropList = document.querySelectorAll(".dropdown select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  dropListImg = document.querySelector(".dropdown img");

for (let select of dropList) {
  for (currency_code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currency_code;
    newOption.value = currency_code;
    if (select.name === "from" && currency_code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currency_code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
    select.addEventListener("change", (event) => {
      updateFlag(event.target);
    });
  }
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const btn = document.querySelector(".button"),
  exchangeRateText = document.querySelector(".exchange_rate");


const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amount.value = 1;
    amtVal = 1;
  }
  exchangeRateText.innerText = "Getting Exchange Rate......";
  // console.log(fromCurrency.value, toCurrency.value);

  //fetching api response and return it with parse into js obj
  let url = `${BASE_URL}/${fromCurrency.value}`;
  let response = await fetch(url);
  let result = await response.json();
  let exchangeRate = result.conversion_rates[toCurrency.value];
  let totalExchangeRate = (amtVal * exchangeRate).toFixed(5);
  exchangeRateText.innerText = `${amount.value} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
};


btn.addEventListener("click", async (event) => {
  event.preventDefault(); //preventing form from submitting
  updateExchangeRate();
});

window.addEventListener('load', (event)=>{
  updateExchangeRate();
})