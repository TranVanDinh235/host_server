const express = require('express');
const userCtrl = require('../controllers/UserController');

const router = express.Router();

router.route('/:id').get(userCtrl.get);

module.exports.router = router;