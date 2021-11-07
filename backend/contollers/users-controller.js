const {v4: uuidv4} = require('uuid');
const {validationResult} = require("express-validator");

const HttpError = require('../models/http-error');
const User = require('../models/users');

const getUsers = async (req, res, next) => {
    let users;
    try {
        // -password exclude password(only email and name showed)
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError(
            'fetching users failed', 500
        );
        return next(error);
    }
    res.json({users: users.map(user => user.toObject({getters: true}))});
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input', 422));
    }

    const {name, email, password} = req.body;

    let existingUser;
    try {
        // findOne() -> find one document matching the criteria 'email'
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError(
            'sign up failed', 500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
            'User exists, please Log in', 422);

        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        password,
        tasks: []
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'sign up failed.', 500
        );
        return next(error);
    }

    res.status(201).json({user: createdUser.toObject({getters: true})});
};

const login = async (req, res, next) => {
    const {email, password} = req.body;

    let existingUser;

    try {
        // findOne() -> find one document matching the criteria 'email'
        existingUser = await User.findOne({email: email});
    } catch (err) {
        const error = new HttpError(
            'logging in failed', 500
        );
        return next(error);
    }

    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            'invalid credentials', 401
        );
        return next(error);
    }

    res.json({message: 'Logged in!'});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
