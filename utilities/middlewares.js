var userCtrl = require('../controllers/user.ctrl');

//middleware
function isAuthenticated(req, res, next) {
    var authHeader = req.headers["authorization"];
    var tokens = authHeader.split(" ");
    var decodedHeader = new Buffer(tokens[1], "base64");
    var decodedStr = decodedHeader.toString();
    var credentials = decodedStr.split(":");
    userCtrl.signin(credentials[0], credentials[1], function (err) {
        if (!err) next();
        else {
            res.status(401);
            res.send("Bad credentials");
        }
    });
}

module.exports = isAuthenticated;