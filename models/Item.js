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

// To set up multer route to .upload folder
// app.use(multer({dest:'./uploads/'}).single('photo'));

// app.post('/api/photo',function(req,res){
//   var newItem = new Item();
//   newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//   newItem.img.contentType = 'image/png';
//   newItem.save();
//  });

module.exports = Item;