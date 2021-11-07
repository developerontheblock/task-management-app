const {v4: uuidv4} = require('uuid');
const {validationResult} = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Task = require('../models/task');
const User = require('../models/users');

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

    let userWithTasks;
    try {
        // populate() -> access to the corresponding tasks that user has
        userWithTasks = await User.findById(userId).populate('tasks');
    } catch (err) {
        const error = new HttpError(
            'fetching task failed', 500
        );
        return next(error);
    }

    if (!userWithTasks || userWithTasks.tasks.length === 0) {
        return next(
            new HttpError('Could not find tasks for the provided user id.', 404)
        );
    }
    // getters: true -> the same id without underscore
    res.json({tasks: userWithTasks.tasks.map(task => task.toObject({getters: true}))});
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

    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError(
            'creating task failed. Try again', 500
        );
        return next(error);
    }

    if(!user){
        const error = new HttpError(
            'cannot find user with this id', 404
        );
        return next(error);
    }

    try {
        // transaction allows to perform multiple operations in isolation of each other. Build on sessions
        const sess = await mongoose.startSession();
        sess.startTransaction();

        createdTask.save({ session: sess});
        user.tasks.push(createdTask);

        await user.save({ session: sess });
        sess.commitTransaction();
    } catch (err) {
         // this error will occur when db server is down or db validation fail
        const error = new HttpError(
            'creating task failed. Try again', 500
        );
        return next(error);
    }

    res.status(201).json({task: createdTask});
};

const updateTask = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input', 422));
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
        // .populate() -> to refer to a doc. in another collection and to work with data in that existing doc. of that another collection
        task = await Task.findById(taskId).populate('creator');
    } catch (err) {
        const error = new HttpError(
            'delete failed', 500
        );
        return next(error);
    }

    if(!task){
        const error = new HttpError(
            'There is no task with that id', 404
        );
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();

        await task.remove({ session: sess });
        task.creator.tasks.pull(task);

        await task.creator.save({ session: sess });
        await sess.commitTransaction();

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



