const express = require('express')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const rentedSchema = new Schema({
    startDate: {type:Date, required: true},
    endDate: {type:Date, required: true},
    approved: {type: Boolean, reqiured: true},
    itemId: {type: String, required: true},
    renterId: {type: String, required: true}
});

const Rented = mongoose.model("Rented", rentedSchema);

module.exports = Rented;