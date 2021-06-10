const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const validatedSignUpInput = require('../validation/signup');

const asyncHandler = require('express-async-handler');
const passport = require('passport');

const register = asyncHandler(async (req,res) => {
 
    const {errors, isValid } = validatedSignUpInput(req.body);
    const {username, email, password, passwordCheck} = req.body;
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const existingUser = await User.findOne({email});
    
    if (existingUser) {
        res.status(400)
        throw new Error('User already exists')
    }

    if (password !== passwordCheck) {
        return res.status(400).json({msg:'Password does not match confirmation.'});

    }

    const salt = await bcrypt.genSalt();
    const pwHash = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: pwHash,
        isAdmin: false
    });

    const savedUser = await newUser.save();

    
    if (savedUser) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
});

const login = asyncHandler(async (req, res) => {
    res.json(req.isAuthenticated());
})

const logout = asyncHandler(async (req,res) => {
    req.logout();
    res.redirect('/');
})

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
}

const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    res.json(user);
})

const getMyProfile = asyncHandler(async (req,res) => {
    if (!req.isUnauthenticated()) {
        res.json(req.user)
    }
    else res.json('')
})

const updateProfile = asyncHandler(async (req,res) => {
    const {username, email, password, confirmPassword} = req.body;
    if (password !== confirmPassword) {
        res.status(400)
        throw new Error('Password does not match confirmation') 
    }

    const user = await User.findById(req.user.id)
    user.username = username;
    user.email = email;
    user.password = password;

    await user.save();
    res.json(user);
})

const addAdmin = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.isAdmin = true;

        const savedUser = await user.save();
        res.json(savedUser.isAdmin)
    }
    catch (err) {

        console.log(err) 
    }

    

})

const removeAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.isAdmin = false;

        const savedUser = await user.save();
        res.json(savedUser.isAdmin)
    }
    catch (err) {

        console.log(err) 
    }
}

module.exports = { 
    register, 
    login, 
    getUsers, 
    addAdmin, 
    removeAdmin, 
    getProfile, 
    getMyProfile,
    updateProfile,
    logout,
}