var mongoose = require("mongoose");


const BookSchema = {
  title: { type: String, require: true },
  author: { type: String, require: true },
  language: { type: String, require: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, require: true }
};
module.exports = mongoose.model("Book", BookSchema);
