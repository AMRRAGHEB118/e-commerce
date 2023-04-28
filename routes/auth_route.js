const express = require('express');
const router = express.Router();

const { sign_up_validator } = require('../utils/validators/auth_validator');

const { sign_up } = require('../controllers/auth_controllers');

router.route('/signup').post(sign_up_validator, sign_up);


module.exports = router;
