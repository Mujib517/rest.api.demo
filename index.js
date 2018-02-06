var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var productCtrl = require('./controllers/product.ctrl');
var defaultCtrl = require('./controllers/default.ctrl');
var defaultRouter = require('./routes/default.router');
var productRouter = require('./routes/product.router');
var userRouter = require('./routes/user.router');
var isAuthenticated = require("./utilities/middlewares");

var app = express();
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

mongoose.connect("mongodb://localhost/myproductsdb");

app.use(bodyParser.json());

app.use('/', defaultRouter);
app.use('/api/users', userRouter);



app.use(isAuthenticated);
app.use('/api/products', productRouter);

