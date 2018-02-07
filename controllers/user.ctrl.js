var User = require('../models/user.model');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../utilities/config');
var logger = require('../utilities/logger');

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
                    logger.error(err);
                    res.send("Username already exists. Please signin");
                }
                else {
                    logger.error(err);
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
                        var token = jwt.sign({ username: req.body.username }, config.password,
                            { expiresIn: config.expiry });
                        var response = {
                            username: req.body.username,
                            token: token
                        };
                        res.json(response);
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