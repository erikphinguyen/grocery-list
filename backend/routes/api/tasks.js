const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { requireAuth, restoreUser } = require('../../utils/auth.js');
const { User, Task } = require('../../db/models');

// GET TASKS
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const tasks = await Task.findAll({
        // include: {
        //     model: User,
        // }
        // where: {
        //     userId: Number(id)
        // }
    });
    console.log('WHAT IS ID', typeof(id))
    console.log('WHAT IS TASKS TYPE', typeof(tasks))
    console.log('WHAT IS TASKS', tasks)

    return res.json(tasks);
}))

// POST TASK
router.post('/', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { userId, task } = req.body;

    const newTask = await Task.create({
        userId,
        task
    });

    return res.json(newTask);
}))


// EDIT TASK
router.put('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    const taskToEdit = await Task.findByPk(id);

    taskToEdit.task = task;

    await taskToEdit.save();

    return res.json(taskToEdit);
}))

// DELETE TASK
router.delete('/:id(\\d+)', requireAuth, restoreUser, asyncHandler(async (req, res) => {
    const { id } = req.params;

    const taskToDelete = await Task.findByPk(id);

    await taskToDelete.destroy();

    return res.json(taskToDelete);
}))

module.exports = router;
