const express = require('express');
const router = express.Router();
const app = express();
const { signupEmail, verifyUserEmail, loginEmail } = require('../controllers/userManager');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/register', async function(req, res, next) {
    await signupEmail(req, res)
});

router.post('/api/login', async function(req, res, next) {
    await loginEmail(req, res)
});

// This route will get called when a user verifies their email. ('clicked' from the link I sent in the email '/signup/email')
router.get('/api/email/verify/:uniqueString?', async(req, res) => {

    await verifyUserEmail(req, res);
});

module.exports = router;
