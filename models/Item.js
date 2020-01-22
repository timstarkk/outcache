const express = require('express')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentedSchema = new Schema({
  startDate: { type: Date, required: true},
  endDate: { type: Date, required: true},
  renterId: { type: String, required: true},
  approved: {type: Boolean, required: true},
  itemId: { type: String, required: true}
})

const itemSchema = new Schema({
  itemName: { type: String, required: true, trim: true},
  category: { type: String, required: true, trim: true},
  price: { type: Number, required: true, trim: true}, 
  img: { type: String, required: true},
  userId: { type: String, required: true},
  userName:{ type: String, required: true},
  description: {type: String, trim: true},
  zipcode: {type: String, required: true},
  rented: [ rentedSchema ]
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