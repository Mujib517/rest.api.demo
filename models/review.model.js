var mongoose = require('mongoose');


module.exports = mongoose.model("Review", {
    productId: String,
    name: String,
    rating: Number,
    subject: String,
    message: String,
    lastUpdated: { type: Date, default: Date.now() }
});