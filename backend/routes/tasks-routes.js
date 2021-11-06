const express = require('express');

const router = express.Router();

const tasksContoller = require('../contollers/tasks-controller');

router.get('/:tid',  tasksContoller.getTaskById);

router.get('/user/:uid', tasksContoller.getTasksByUserId);

router.post('/', tasksContoller.createTask);

router.patch('/:tid', tasksContoller.updateTask);
router.delete('/:tid', tasksContoller.deleteTask);

module.exports = router;



