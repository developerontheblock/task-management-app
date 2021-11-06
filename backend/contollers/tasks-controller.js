const {v4: uuidv4} = require('uuid');
const {validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const Task = require('../models/task');

let DUMMY_TASKS = [
    {
        id: 't1',
        title: 'bug task',
        description: 'This task contains a bug',
        creator: 'u1'
    }
];

const getTaskById = async (req, res, next) => {
    const taskId = req.params.tid;
    let task;

    try {
        task = await Task.findById(taskId);
    } catch (err) {
        // displayed if GET request has a problem
        const error = new HttpError(
            'could not find a task with this id', 500
        );
        return next(error);
    }

    if (!task) {
        const error = new HttpError('Could not find a task for the provided id.', 404);
        return next(error);

    }
    // toObject() ->turn task as normal js obj ,getters true -> mongoose add an id to every document which returns _id like a string
    res.json({task: task.toObject({getters: true})});
};

const getTasksByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let tasks;
    try {
        tasks = await Task.find({creator: userId});
    } catch (err) {
        const error = new HttpError(
            'fetching task failed', 500
        );
        return next(error);
    }

    if (!tasks || tasks.length === 0) {
        return next(
            new HttpError('Could not find tasks for the provided user id.', 404)
        );
    }
    // getters: true -> the same id without underscore
    res.json({tasks: tasks.map(place => place.toObject({getters: true}))});
};

const createTask = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError('Invalid input', 422);
    }
    const {title, description, creator} = req.body;

    const createdTask = new Task({
        title,
        description,
        creator
    });

    try {
        await createdTask.save();
    } catch (err) {
        const error = new HttpError(
            'creating task failed. Try again', 500
        );
        return next(error);
    }

    res.status(201).json({place: createdTask});
};

const updateTask = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError('Invalid input', 422);
    }

    const {title, description} = req.body;
    const taskId = req.params.tid;


    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        const error = new HttpError(
            'update failed', 500
        );
        return next(error);
    }
    task.title = title;
    task.description = description;

    try {
        await task.save();
    } catch (err) {
        const error = new HttpError(
            'could not update task', 500
        );
        return next(error);
    }

    res.status(200).json({task: task.toObject({getters: true})});

};
const deleteTask = async (req, res, next) => {
    const taskId = req.params.tid;

    let task;
    try {
        task = await Task.findById(taskId);
    } catch (err) {
        const error = new HttpError(
            'delete failed', 500
        );
        return next(error);
    }
    try {
        await task.remove();
    } catch (err) {
        const error = new HttpError(
            'delete failed', 500
        );
        return next(error);
    }
    
    res.status(200).json({message: 'Successfully deleted'});
};

exports.getTaskById = getTaskById;
exports.getTasksByUserId = getTasksByUserId;
exports.createTask = createTask;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;



