var User = require('../models/user.model');
var bcrypt = require('bcrypt');


function sendErrorResponse(res) {
    res.status(401);
    res.send("Unauthorized");
}


module.exports = {
    signup: function (req, res) {

        var user = new User(req.body);

        var hash = bcrypt.hashSync(req.body.password, 2);
        //req.body.password = hash;
        user.password = hash;

        user.save()
            .then(function (user) {
                var jsonUser = user.toJSON();
                delete jsonUser.password;
                res.status(201);
                res.json(jsonUser);
            })
            .catch(function (err) {
                if (err && err.errmsg && err.errmsg.indexOf("duplicate key error index") > -1) {
                    res.status(500);
                    res.send("Username already exists. Please signin");
                }
                else {
                    res.status(500);
                    res.send(err);
                }

            });
    },
    signin: function (req, res) {

        User.findOne({ username: req.body.username })
            .exec()
            .then(function (user) {
                if (user) {
                    var result = bcrypt.compareSync(req.body.password, user.password);
                    if (result) {
                        res.status(200);
                        res.send("Success");
                    }
                    else sendErrorResponse(res);
                }
                else sendErrorResponse(res);
            })
            .catch(function (err) {
                sendErrorResponse(res);
            });
    }
};