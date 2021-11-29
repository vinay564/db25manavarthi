"use strict";

var mongoose = require("mongoose");

var gasSchema = mongoose.Schema({
  costume_type: String,
  cost: {
    type: Number,
    min: 15,
    max: 100
  }
});
module.exports = mongoose.model("Costumes", gasSchema);