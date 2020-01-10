const express = require('express')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const multer = require('multer')
const fs = require('fs')

const app = express();



const itemSchema = new Schema({
  itemName: { type: String, required: true},
  category: String,
  price: String, 
  img: String
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;