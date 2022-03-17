const axios = require("axios");
const Item = require("../models/Item.js");
const ExchangeRate = require("../models/ExchangeRate.js");
async function getItems() {
  try {
    const response = await axios.get("https://zombie-items-api.herokuapp.com/api/items");
    if (!response && !response.data && !response.data) {
      throw new Error("No items retrieved from server.");
    }
    const itemsMapped = response.data.items.map((i) => {
      return {
        _id: i.id,
        name: i.name,
        price: i.price
      };
    });
    await Item.deleteMany();
    await Item.insertMany(itemsMapped);
    console.log("Items succesfully saved!");
  } catch (err) {
    console.error(err);
  }
}
async function getDailyExchanges() {
  try {
    const response = await axios.get("http://api.nbp.pl/api/exchangerates/tables/C/today/");
    if (!response && !response.data && !response.data) {
      throw new Error("No items retrieved from server.");
    }
    const rates = (response.data && response.data[0] && response.data[0].rates) || [];
    if (rates && rates.length) {
      await ExchangeRate.deleteMany();
      await ExchangeRate.insertMany(rates);
      const exchEUR = rates.find((i) => i.code === "EUR");
      const exchUSD = rates.find((i) => i.code === "USD");
      global.EXCHANGE_RATE_EUR = exchEUR.bid;
      global.EXCHANGE_RATE_USD = exchUSD.bid;
      console.log("Exchange rates succesfully saved!");
    }
  } catch (err) {
    console.error(err);
  }
}
async function setGlobalRates() {
  const exchangeRates = await ExchangeRate.find({ code: { $in: ["EUR", "USD"] } });
  if (exchangeRates && exchangeRates.length) {
    const exchEUR = exchangeRates.find((i) => i.code === "EUR");
    const exchUSD = exchangeRates.find((i) => i.code === "USD");
    global.EXCHANGE_RATE_EUR = exchEUR.bid;
    global.EXCHANGE_RATE_USD = exchUSD.bid;
  } else {
    getDailyExchanges();
  }
}
module.exports = { getItems, getDailyExchanges, setGlobalRates };
