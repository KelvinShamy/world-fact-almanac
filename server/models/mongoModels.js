const mongoose = require('mongoose');

// const MONGO_URI = "mongodb+srv://kiosk:1234@cluster0.fadk0p7.mongodb.net/?retryWrites=true&w=majority"

// mongoose.connect(MONGO_URI, {
//     // options for the connect method to parse the URI
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // sets the name of the DB that our collections are part of
//     dbName: 'solodb'
//   })
//     .then(() => console.log('Connected to Mongo DB.'))
//     .catch(err => console.log(err));

    // IS THE ABOVE ALL STILL NECESSARY HERE?

const Schema = mongoose.Schema;


// FAVORITES SCHEMA
const favsSchema = new Schema({
  country: { type: String, required: true },
  visited: { type: Boolean, required: true, default: false}
});

const Fav = mongoose.model('favorites', favsSchema);

// USER SCHEMA


// COMMENT SCHEMA



// must export at the bottom of the file!
module.exports = {
  Fav
};