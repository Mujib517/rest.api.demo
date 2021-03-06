var Product = require('../models/product.model');
var Review = require('../models/review.model');
var logger = require('../utilities/logger');


//ORM ODM
module.exports = {
    get: function (req, res) {

        var count = 0;
        var pageSize = +req.params.pageSize || 10;
        var pageIndex = +req.params.pageIndex || 0;
        var sortBy = req.query.sort || 'lastUpdated';
        var sortDirection = req.query.sortDirection ? req.query.sortDirection.toLowerCase() === 'asc' ? "" : "-" : "-";

        Product.count().exec()
            .then(function (cnt) {
                count = cnt;
                logger.info({ message: "Fetched " + cnt + " Records" });
                //deferred execution
                var query = Product
                    .find({}, { '__v': 0 })
                    .skip(pageIndex * pageSize)
                    .limit(pageSize)
                    .sort(sortDirection + sortBy);

                return query.exec();
            })
            .then(function (products) {

                for (var i = 0; i < products.length; i++) {
                    if (products[i].image)
                        products[i].image = req.protocol + "://" + req.get('host') + "/" + products[i].image;
                }

                var response = {
                    metadata: {
                        count: count,
                        total: Math.ceil(count / pageSize)
                    },
                    data: products
                };
                res.status(200);
                res.json(response);
            })
            .catch(function (err) {
                logger.error(err);
                console.log(err)
            });
    },

    getById: function (req, res) {
        var id = req.params.id;
        Product.findById(id, { '__v': 0 }).exec()
            .then(function (product) {
                if (product) {
                    Review.aggregate([
                        { $match: { productId: id } },
                        { $group: { _id: 'productId', rating: { $avg: '$rating' } } }

                    ])
                        .exec()
                        .then(function (data) {
                            Review.find({ productId: id }, { '__v': 0 })
                                .exec()
                                .then(function (reviews) {
                                    var jsonProduct = product.toJSON();
                                    jsonProduct.reviews = reviews;
                                    if (data && data.length > 0) {
                                        var avgRating = data[0].rating;
                                        jsonProduct.rating = avgRating;
                                    }
                                    res.status(200);
                                    res.json(jsonProduct);
                                });
                        });
                }
                else {
                    res.status(404);
                    res.send("Not found");
                }
            })
            .catch(function (err) {
                res.status(500);
                res.send("Internal Server Error");
            });
    },

    save: function (req, res) {

        var img = req.filename;
        req.body.image = img;

        var product = new Product(req.body);

        product.save(function (err, product) {
            if (err) {
                res.status(500);
                res.send(err);   //Internal Server Error.logging
            }
            else {
                res.status(201); //created
                res.json(product);
            }
        });
    },

    update: function (req, res) {
        var id = req.params.id;

        Product.findByIdAndUpdate(id,
            { $set: { model: req.body.model, brand: req.body.brand, price: req.body.price, inStock: req.body.inStock } },

            function (err, product) {
                if (err) {
                    res.status(500);
                    res.send(err);
                }
                else {
                    res.status(200);
                    res.json(product);
                }
            });
    },

    delete: function (req, res) {
        var id = req.params.id;
        Product.findByIdAndRemove(id, function (err) {
            if (!err) {
                res.status(204);
                res.send();
            }
            else {
                res.status(500);
                res.send("Internal Server Error");
            }
        });
    }
};

