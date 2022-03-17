const mongoose = require("mongoose");
const ExchangeRateSchema = mongoose.Schema({
    _id: Number,
    currency: String,
    code: String,
    bid: Number,
    ask: Number
});

module.exports = mongoose.model("ExchangeRate", ExchangeRateSchema);