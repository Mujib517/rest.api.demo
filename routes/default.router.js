var express = require('express');
var defaultCtrl = require('../controllers/default.ctrl');
var router = express.Router();  //function 

router.get('/', defaultCtrl.get);
router.get('/health',defaultCtrl.health);

module.exports = router;