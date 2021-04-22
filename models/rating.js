const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewRatingSchema = new Schema ({
    driverName:String,
    rating: String
});

const Rating = mongoose.model('Rating', NewRatingSchema);

module.exports = Rating;