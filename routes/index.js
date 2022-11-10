const express = require('express');
const router = express.Router();
const app = express();
const { signupEmail } = require('../controllers/userManager');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/register', async function(req, res, next) {
    await signupEmail(req, res)
});

module.exports = router;
