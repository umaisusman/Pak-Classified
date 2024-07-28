const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

// POST /send-email
router.post('/send-email',emailController.sendEmailController);

module.exports = router;

