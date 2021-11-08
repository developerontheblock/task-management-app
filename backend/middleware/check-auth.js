const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

// logic to validate to incoming request for its token
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        // automatically provided by express.js HEADERS
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error('Authentication failed![invalid token]');
        }
        // verify returns a string
        const decodedToken = jwt.verify(token, 'supersecret');
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError('Authentication failed!', 403);
        return next(error);
    }
};
