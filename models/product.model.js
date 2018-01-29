var mongoose = require('mongoose');

var model = mongoose.model('Product', {
    brand: String,
    model: String,
    price: Number,
    inStock: Boolean,
    lastUpdated: { type: Date, default: Date.now() }
});

module.exports = model;