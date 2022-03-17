const mongoose = require("mongoose");
const ItemSchema = mongoose.Schema({
    _id: Number,
    name: String,
    price: Number
});
module.exports = mongoose.model("Item", ItemSchema);