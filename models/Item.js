const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: { type: String, required: true},
  category: String,
  price: String,
  
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;