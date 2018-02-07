var fs = require('fs');
var bunyan = require("bunyan");

var file = fs.createWriteStream("./logs/application.log", { flags: 'a' });

var logger = bunyan.createLogger({
    name: 'app',
    streams: [{
        level: 'info',
        stream: file
    }]
});

module.exports = logger;