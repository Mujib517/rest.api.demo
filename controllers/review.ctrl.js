var Review = require('../models/review.model');

function ReviewCtrl() {

    this.save = function (req, res) {
        var review = new Review(req.body);
        review.save()
            .then(function (savedReview) {
                res.status(201);
                res.json(savedReview);
            })
            .catch(function (err) {
                res.status(500);
                res.send(err);
            });
    }
};


module.exports = new ReviewCtrl();