const express = require('express');
const router = express.Router();

const {
    create_user_validator,
    update_user_validator,
    get_user_validator,
    delete_user_validator,
} = require('../utils/validators/user_validator');

const {
    get_users,
    get_user,
    create_user,
    update_user,
    delete_user,
} = require('../controllers/users_controllers');

router.route('/').get(get_users).post(create_user_validator, create_user);
router
    .route('/:id')
    .get(get_user_validator, get_user)
    .put(update_user_validator, update_user)
    .delete(delete_user_validator, delete_user);

module.exports = router;
