const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  rentals: {
    type: Array
  },
  items: {
    type: Schema.Types.ObjectId,
    ref: "Item"
  }
});

module.exports = User = mongoose.model("users", UserSchema);