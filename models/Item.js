const express = require('express')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const itemSchema = new Schema({
  itemName: { type: String, required: true, trim: true},
  category: { type: String, required: true, trim: true},
  price: { type: Number, required: true, trim: true}, 
  img: String,
  userId: { type: String, required: true},
  userName:{ type: String, required: true},
  description: {type: String, trim: true},
  zipcode: {type: String, trim: true},
  rented: [{
    type: Schema.Types.ObjectId,
    ref: "Rented"
  }]
});

itemSchema.index({
  itemName: 'text',
  zipcode: 'text',
  category: 'text'
}, {
  weights: {
    itemName: 5,
    zipcode: 4,
    category: 3,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;