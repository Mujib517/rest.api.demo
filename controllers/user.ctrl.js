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
    signin: function (username, password, done) {

        User.findOne({ username: username })
            .exec()
            .then(function (user) {
                if (user) {
                    var result = bcrypt.compareSync(password, user.password);
                    if (result) done(null);
                    else done("Bad Credentials");
                }
                else done("Bad Credentials");
            })
            .catch(function (err) {
                done("Bad Credentials");
            });
    }
};