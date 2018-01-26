var express = require('express');
var bodyParser = require("body-parser");

var productCtrl = require('./controllers/product.ctrl');
var defaultCtrl = require('./controllers/default.ctrl');
var defaultRouter = require('./routes/default.router');
var productRouter = require('./routes/product.router');

var app = express();
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

app.use(bodyParser.json());

app.use('/', defaultRouter);
app.use('/api/products', productRouter);
