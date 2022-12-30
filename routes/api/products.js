const express = require('express');
const router = express.Router();
const { getDiet } = require('../../controllers/products');
const ctrl = require('../../controllers/products');
const { ctrlWrapper, validation, auth } = require('../../middelwares');
const { joiSchema } = require('../../models/product');

router.post('/', validation(joiSchema), ctrlWrapper(getDiet));
router.get('/all', ctrlWrapper(ctrl.allProducts));
router.get('/all/query', auth, ctrlWrapper(ctrl.queryProducts));
router.post('/:id', auth, ctrlWrapper(ctrl.bloodDietProductUser));

module.exports = router;