const {v4: uuidv4} = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            'Could not create a user', 500
        );
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
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

    let token;
    try {
        // returns string(token)
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    res.status(201)
        .json({ userId: createdUser.id, email: createdUser.email, token: token });
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

    if (!existingUser) {
        const error = new HttpError(
            'invalid credentials', 403
        );
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        // server side error !!!not error from invalid credentials
        const error = new HttpError(
            '[Server side error]Check your credentials!', 500
        );
        return next(error);
    }

    if (!isValidPassword) {
        const error = new HttpError(
            'invalid credentials', 403
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch (err) {
        const error = new HttpError(
            'Logging in failed, please try again later.',
            500
        );
        return next(error);
    }

    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
