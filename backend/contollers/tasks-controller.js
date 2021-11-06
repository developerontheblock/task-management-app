const {v4: uuidv4} = require('uuid');
const HttpError = require('../models/http-error');

let DUMMY_TASKS = [
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

const getTasksByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const tasks = DUMMY_TASKS.filter(t => {
        return t.creator === userId;
    });

    if (!tasks || tasks.length === 0) {
        return next(
            new HttpError('Could not find tasks for the provided user id.', 404)
        );
    }

    res.json({tasks});
};

const createTask = (req, res, next) => {
    const {title, description, creator} = req.body;
    const createdTask = {
        id: uuidv4(),
        title,
        description,
        creator
    };

    DUMMY_TASKS.push(createdTask);

    res.status(201).json({place: createdTask});
};

const updateTask = (req, res, next) => {
    const {title, description} = req.body;
    const taskId = req.params.tid;

    const updatedTask = {...DUMMY_TASKS.find(t => t.id === taskId) }; //this created new obj and copies all the key-value pairs from old obj
    const taskIndex = DUMMY_TASKS.findIndex(t => t.id === taskId);

    updatedTask.title = title;
    updatedTask.description = description;
    DUMMY_TASKS[taskIndex] = updatedTask;

    res.status(200).json({task: updatedTask });

};
const deleteTask = (req, res, next) => {
    const taskId = req.params.tid;

    DUMMY_TASKS = DUMMY_TASKS.filter(t => t.id !== taskId);

    res.status(200).json({message: 'Successfully deleted' });
};

exports.getTaskById = getTaskById;
exports.getTasksByUserId = getTasksByUserId;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;



