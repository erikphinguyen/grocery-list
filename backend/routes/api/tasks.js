const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth.js');
const { User, Task } = require('../../db/models');

// GET TASKS
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const tasks = await Task.findAll({
        where: {
            userId: id
        }
    });

    return res.json(tasks);
}))

module.exports = router;
