const express = require('express')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const rentedSchema = new Schema({
    startDate: {type:Date, required: false},
    endDate: {type:Date, required: false},
    approved: {type: Boolean, reqiured: false},
    itemId: {type: String, required: false},
    renterId: {type: String, required: false}
});

const Rented = mongoose.model("Rented", rentedSchema);

module.exports = Rented;