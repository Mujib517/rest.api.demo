module.exports = {
    get: function (req, res) {
        var products = [{ id: 1, brand: "Nokia", model: 'N8', price: 200, inStock: true },
        { id: 2, brand: "Sony", model: 'X8', price: 200, inStock: true },
        { id: 3, brand: "Samsung", model: 'S8', price: 1200, inStock: false },
        { id: 4, brand: "Apple", model: 'Iphone8', price: 2200, inStock: true }];

        //1xx  information
        //2xx  success 200,201,204
        //3xx  redirections 301,302,304
        //4xx  client errors (unauthorized,not found)
        //5xx  server errors (internal server,svc.unavailable)
        res.status(200); //Ok
        res.json(products);
    }
};

