const express = require('express');
const router = express.Router()
const isAdmin = require('../middleware/auth');
const { 
    register, 
    login, 
    getUsers,
    addAdmin,
    removeAdmin,
    logout,
    getProfile,
    getMyProfile 
} = require('../controllers/userController');
const passport = require('passport');

router.route('/')
    .post(register)
    .get(isAdmin, getUsers);

// router.get('/:id', getProfile);    

router.get('/user', getMyProfile);    

router.post('/login', passport.authenticate("local"), login);
router.post('/logout', logout);

router.put('/admin/add/:id', isAdmin, addAdmin);

router.put('/admin/remove/:id', isAdmin, removeAdmin);

module.exports = router;