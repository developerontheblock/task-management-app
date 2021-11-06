const express = require('express');
const bodyParser = require('body-parser');

const taskRoutes = require('./routes/tasks-routes');
const usersRoutes = require('./routes/user-routes');

const HttpError = require('../backend/models/http-error');

const app = express();

app.use(bodyParser.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/users', usersRoutes);


app.use((req, res, next) => {
    const error = new HttpError('Route not found', 404)
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
});

app.listen(5000);
