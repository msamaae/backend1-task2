const express = require('express');
const router = express.Router();


const crudController = require('../controller/crudController');

router.get('/', crudController.read);
router.post('/add', crudController.create);
router.get('/update/:id', crudController.edit);
router.post('/update/:id', crudController.update);
router.get('/delete/:id', crudController.delete);

module.exports = router;
