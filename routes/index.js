var express = require('express');
var router = express.Router();
const API_ROUTER = require('./api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api', API_ROUTER);

module.exports = router;
