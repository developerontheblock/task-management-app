const HttpError = require('../models/http-error');

const DUMMY_TASKS = [
    {
        id: 't1',
        title: 'bug task',
        description: 'This task contains a bug',
        creator: 'u1'
    }
];

const getTaskById = (req, res, next) => {
    const taskId = req.params.tid;
    const task = DUMMY_TASKS.find(t => {
        return t.id === taskId;
    });

    if (!task) {
        throw new HttpError('Could not find a task for the provided id.', 404);
    }

    res.json({task});
};

const getTaskByUserId = (req, res, next) => {
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
};

exports.getTaskById = getTaskById;
exports.getTaskByUserId = getTaskByUserId;

