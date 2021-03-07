const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();

router.route('/native').post(authController.login);
router.route('/social/google').post(authController.loginGoogle);
router.route('/social/facebook').post(authController.loginFacebook);
router.route('/refresh-token').post(authController.refreshToken);

module.exports.router = router;