const mongoose = require("mongoose");
const costumeSchema = mongoose.Schema({
  costumes_type: String,
  size: String,
  cost: Number,
});
module.exports = mongoose.model("Costumes", costumeSchema);
