const express = require('express')
const router = express.Router()

const {
    sign_up_validator,
    log_in_validator,
} = require('../utils/validators/auth_validator')

const {
    sign_up,
    login,
    log_out,
    auth,
} = require('../controllers/auth_controllers')

router.route('/login').post(log_in_validator, login)
router.route('/logout').post(auth, log_out)
router.route('/signup').post(sign_up_validator, sign_up)

module.exports = router
