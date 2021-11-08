const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const tasksContoller = require('../contollers/tasks-controller');
const checkAuth = require('../middleware/check-auth');

router.get('/:tid',  tasksContoller.getTaskById);
router.get('/user/:uid', tasksContoller.getTasksByUserId);

router.use(checkAuth);

router.post('/', [
    check('title').not().isEmpty(),
    check('description').isLength({min:10})],
    tasksContoller.createTask);
router.patch('/:tid', [
    check('title').not().isEmpty(),
    check('description').isLength({min:10})],
    tasksContoller.updateTask);
router.delete('/:tid', tasksContoller.deleteTask);

module.exports = router;



