const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  googleID: { type: String },
  title: { type: String },
  authors: [
    { type: String }
  ],
  synopsis  : String,
  image: String,
  link: String,
  saved: [
    {
    type: Schema.Types.ObjectId,
    ref: "Saved"
    }
  ]
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
 