var mongoose = require('mongoose');

module.exports = mongoose.model("User", {
    username: { type: String, required: [true, "Username required"], unique: true, validate: {
        validator: function (val) {
            return val.length > 5;
        },
        message: "Username length should be 6 or more chars"
    } },
    password: {
        type: String, required: true    },
    lastUpdated: { type: Date, default: Date.now() },
    active: { type: Boolean, default: true }
}); 