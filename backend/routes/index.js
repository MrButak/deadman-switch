const express = require('express');
const router = express.Router();
const { signupEmail, verifyUserEmail, loginEmail, getHttpCookie } = require('../controllers/userManager');
const { getDeadmanSwitchesWithUserId, createNewSwitch } = require('../controllers/switchManager');

// User signs up for an account
router.post('/api/user/register', async function(req, res, next) {
    await signupEmail(req, res)
});

// User logs in
router.post('/api/user/login', async function(req, res, next) {
    await loginEmail(req, res)
});

// This route will get called when a user verifies their email. ('clicked' from the link I sent in the email '/signup/email')
router.get('/api/email/verify/:uniqueString?', async function(req, res) {
    await verifyUserEmail(req, res);
});

// This route is called to check if a user is logged in
router.get('/api/user/verify', async function(req, res) {
    await getHttpCookie(req, res);
});

// This route is called on app load ONLY if a user is logged in
router.get('/api/user/data/deadman-switches/:userId?', async function(req, res) {
    await getDeadmanSwitchesWithUserId(req, res, userId);
});

router.post('/api/switch/create', async function(req, res) {
    await createNewSwitch(req, res);
});

module.exports = router;
