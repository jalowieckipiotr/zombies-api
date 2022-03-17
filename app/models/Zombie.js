const mongoose = require("mongoose");
const ZombieSchema = mongoose.Schema({
  name: String,
  creationDate: Date,
  items: [Number]
});
module.exports = mongoose.model("Zombie", ZombieSchema);
