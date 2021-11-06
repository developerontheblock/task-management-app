const express = require('express');

const router = express.Router();

const tasksContollers = require('../contollers/tasks-controllers');

router.get('/:tid',  tasksContollers.getTaskById);

router.get('/user/:uid', tasksContollers.getTaskByUserId);

router.post('/', tasksContollers.createTask);

module.exports = router;



