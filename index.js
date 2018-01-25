var express = require('express');
var productCtrl = require('./controllers/product.ctrl');
var defaultCtrl = require('./controllers/default.ctrl');
var defaultRouter = require('./routes/default.router');

var app = express();
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

app.use('/', defaultRouter);
app.get('/products', productCtrl.get);