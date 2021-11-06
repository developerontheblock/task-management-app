const express = require('express');

const router = express.Router();
const HttpError = require('../models/http-error');

const DUMMY_TASKS = [
    {
        id: 't1',
        title: 'bug task',
        description: 'This task contains a bug',
        creator: 'u1'
    }
];

router.get('/:tid', (req, res, next) => {
    const taskId = req.params.tid;
    const task = DUMMY_TASKS.find(t => {
        return t.id === taskId;
    });

    if (!task) {
        throw new HttpError('Could not find a task for the provided id.', 404);
    }

    res.json({task});
});

router.get('/user/:uid', (req, res, next) => {
    const userId = req.params.uid;
    const task = DUMMY_TASKS.find(t => {
        return t.creator === userId;
    });

    if (!task) {
        return next(
            new HttpError('Could not find a task for the provided user id.', 404)
        );
    }

    res.json({task});
});

module.exports = router;



