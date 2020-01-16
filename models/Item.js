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
  zipcode: {type: String, required: true},
  rented: [{ type:Object
  }]
});

itemSchema.index({
  itemName: 'text',
  category: 'text',
  description: 'text',
}, {
  weights: {
    itemName: 5,
    category: 3,
    description: 1,
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;