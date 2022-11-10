var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/register', function(req, res, next) {
    console.log('hitting');
    return res.status(200)
});

module.exports = router;
