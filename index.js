var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var morgan = require('morgan');
var fs = require('fs');
var os = require('os');
var cluster = require('cluster');


var productCtrl = require('./controllers/product.ctrl');
var defaultCtrl = require('./controllers/default.ctrl');
var defaultRouter = require('./routes/default.router');
var productRouter = require('./routes/product.router');
var userRouter = require('./routes/user.router');
var isAuthenticated = require("./utilities/middlewares");
var config = require("./utilities/config");

var app = express();
var port = process.env.PORT || 3000;

if (cluster.isMaster) {
    var cores = os.cpus().length;

    for (var i = 0; i < cores; i++) {
        cluster.fork();
    }
}
else {
    app.listen(port, function () {
        console.log("Server is running on port " + port + " with pid " + process.pid);
    });
}

cluster.on('error', function () {
    cluster.fork();
});

mongoose.connect(config.conStr);

var file = fs.createWriteStream(__dirname + "/logs/request-logger.log", { flags: 'a' });

app.use(morgan('combined', { stream: file }));

app.use(bodyParser.json());

app.use('/', defaultRouter);
app.use('/api/users', userRouter);

//app.use(isAuthenticated);
app.use('/api/products', productRouter);

