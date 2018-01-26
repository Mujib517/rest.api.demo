var products = [{ id: 1, brand: "Nokia", model: 'N8', price: 200, inStock: true },
{ id: 2, brand: "Sony", model: 'X8', price: 200, inStock: true },
{ id: 3, brand: "Samsung", model: 'S8', price: 1200, inStock: false },
{ id: 4, brand: "Apple", model: 'Iphone8', price: 2200, inStock: true }];


module.exports = {
    get: function (req, res) {
        res.status(200); //Ok
        res.json(products);
    },

    getById: function (req, res) {
        var id = +req.params.id;
        var product;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                product = products[i];
                break;
            }
        }
        //falsy: 0,null,undefined,"",NaN,false
        if (product) {
            res.status(200);
            res.json(product);
        }
        else {
            res.status(404);//not found
            res.send("Not found");
        }
    },

    save: function (req, res) {

        products.push(req.body);

        res.status(201); //created
        res.json(req.body);
    }
};

