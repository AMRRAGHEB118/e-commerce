const express = require('express');
const router = express.Router();

const {
    get_users,
    get_user,
    create_user,
    update_user,
    delete_user,
} = require('../controllers/users_controllers');

router
    .route('/')
    .get(get_users)
    .post(create_user);
router
    .route('/:id')
    .get(get_user)
    .put(update_user)
    .delete(delete_user);

module.exports = router;
