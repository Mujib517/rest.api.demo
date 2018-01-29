var express = require('express');
var router = express.Router();
var productCtrl = require('../controllers/product.ctrl');

//HTTP GET http://localhost:3000/products
router.get('/', productCtrl.get);
router.get('/:id', productCtrl.getById);
//HTTP POST http://localhost:3000/products
router.post('/', productCtrl.save);
//HTTP DELETE http://localhost:3000/api/products/abc-def
router.delete('/:id', productCtrl.delete);
router.put('/:id', productCtrl.update);

module.exports = router;