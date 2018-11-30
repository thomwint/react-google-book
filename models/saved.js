const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const SavedSchema = new Schema({
  body: String,
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book"
    }
});

const Saved = mongoose.model("Saved", SavedSchema);

module.exports = Saved;
