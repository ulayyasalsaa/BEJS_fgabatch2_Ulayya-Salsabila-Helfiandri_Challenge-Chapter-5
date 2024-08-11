var express = require('express');
var router = express.Router();
const USER_ROUTER = require('./user');
const PROFILE_ROUTER = require('./profile');
const ACCOUNT_ROUTER = require('./account');
const TRANSACTION_ROUTER = require('./transaction');

router.use('/users', USER_ROUTER);
router.use('/profiles', PROFILE_ROUTER);
router.use('/accounts', ACCOUNT_ROUTER);
router.use('/transactions', TRANSACTION_ROUTER);


module.exports = router;