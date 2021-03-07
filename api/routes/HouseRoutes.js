const express = require('express');
const houseCtrl = require ('../controllers/HouseController')
const upload = require('../helpers/upload')

const router = express.Router();

router.route('/host/:id').get(houseCtrl.getByHost);

router.post('/new/:id', upload.multipleUploadFile, houseCtrl.newHouse);
router.route('/:id').get(houseCtrl.get);
router.route('/:id').post(houseCtrl.insert);
router.route('/:id').put(houseCtrl.update);
router.route('/:id').delete(houseCtrl.remove);

module.exports.router = router;