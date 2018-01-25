var express = require('express');
var app = express();
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

//routing.HTTP GET
app.get('/', function (req, res) {
    res.send("Hello ExpressJS!!");
});

app.get('/health', function (req, res) {
    var response = { status: 'Up' };
    res.json(response);
});