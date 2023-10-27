const express = require('express');
const { authenticate } = require('../middlewares/middleware');
const router = express.Router();

const { 
    getAllUsers,
    getUserById,
    userRegistration, 
    updateUserById, 
    deleteUserById, 
    userLogin
} = require('../controllers/user');

// Register a new user api
router.post('/register', userRegistration)

// Login a registered user api
router.post('/login', userLogin)

// Authorized user api
router.get('/', authenticate(['ADMIN']), getAllUsers);

// Authorized user api
router.route("/:id")
    .get(authenticate(['CUSTOMER','ADMIN']), getUserById)
    .put(authenticate(['CUSTOMER']), updateUserById)
    .delete(authenticate(['CUSTOMER']), deleteUserById);


module.exports = router;
