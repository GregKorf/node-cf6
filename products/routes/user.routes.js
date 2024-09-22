const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controllers');

router.get('/', userController.findAll);

router.get('/:username', userController.findOne);

module.exports = router