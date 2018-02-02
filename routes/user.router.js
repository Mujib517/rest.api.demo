var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.ctrl');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);

module.exports = router;