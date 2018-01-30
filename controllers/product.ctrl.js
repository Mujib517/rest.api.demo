var Product = require('../models/product.model');
//ORM ODM
module.exports = {
    get: function (req, res) {

        var count = 0;
        var pageSize = +req.params.pageSize || 10;
        var pageIndex = +req.params.pageIndex || 0;

        Product.count(function (err, cnt) {
            count = cnt;

            var query = Product.find();

            query.skip(pageIndex * pageSize);
            query.limit(pageSize);

            query.exec(function (err, products) {
                if (err) {
                    res.status(500);
                    res.send("Interal Server Error");
                }
                else {
                    var response = {
                        metadata: {
                            count: count,
                            total: Math.ceil(count / pageSize)
                        },
                        data: products
                    };
                    res.status(200);
                    res.json(response);
                }
            });



            // Product.find({}, { '__v': 0 }, function (err, products) {
            //     if (err) {
            //         res.status(500);
            //         res.send("Interal Server Error");
            //     }
            //     else {
            //         var response = {
            //             metadata: {
            //                 count: count,
            //                 total: Math.ceil(count / pageSize)
            //             },
            //             data: products
            //         };
            //         res.status(200);
            //         res.json(response);
            //     }
            // });
        });
    },

    getById: function (req, res) {
        var id = req.params.id;
        Product.findById(id, { '__v': 0 }, function (err, product) {
            if (!err) {
                if (product) {
                    res.status(200);
                    res.json(product);
                }
                else {
                    res.status(404);
                    res.send("Not found");
                }
            }
            else {
                res.status(500);
                res.send("Internal Server Error");
            }
        })
    },

    save: function (req, res) {

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

