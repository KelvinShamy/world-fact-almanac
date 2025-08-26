const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favsSchema = new Schema({
  country: { type: String, required: true },
  visited: { type: Boolean, required: true, default: false}
});

const Fav = mongoose.model('favorites', favsSchema);

module.exports = {
  Fav
};
