const express = require('express');
const houseCtrl = require ('../controllers/HouseController')

const router = express.Router();

router.route('/upcoming/:id').get(houseCtrl.getTripsUpcoming);
router.route('/finish/:id').get(houseCtrl.getTripsFinish);

module.exports.router = router;