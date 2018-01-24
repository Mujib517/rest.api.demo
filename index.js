//1. JsRE 
//2. Single threaded
//3. Event driven (Event loop)
//4. Server side
//define()
//module.common js. AMD, commonJs and Es6
//7 times api 
//Linked 21 servers ruby on rails 3 boxes and 20% up
var http = require('http');
var fs = require('fs');

function handle(req, res) {
    switch (req.url) {
        case '/':
            fs.readFile("index.html", function (err, contents) {
                res.write(contents);
                res.end();
            });

            break;
        case '/about':
            res.write("About Page");
            res.end();
            break;
        case '/contact':
            res.write("Contact Page");
            res.end();
            break;
        case '/products':
            var products = [
                { id: 1, brand: "Nokia", model: "n8", price: 200, inStock: false },
                { id: 2, brand: "Samsung", model: "n8", price: 200, inStock: true },
                { id: 3, brand: "Apple", model: "Iphone 8", price: 1200, inStock: true },
                { id: 4, brand: "Sony", model: "Xperia", price: 1200, inStock: false }
            ];
            res.write(JSON.stringify(products));
            res.end();
            break;
        default:
            res.write("Hello NodeJs");
            res.end();
            break;
    }

}

var server = http.createServer(handle);
server.listen(3000);

console.log("Server is running on 3000");