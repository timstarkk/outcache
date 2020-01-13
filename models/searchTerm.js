const express = require('express')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const searchSchema = new Schema({
  term: { type: String, required: true},
});

const SearchTerm = mongoose.model("SearchTerm", searchSchema);

module.exports = SearchTerm;