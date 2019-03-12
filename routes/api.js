const express = require('express');
const mongoose = require('mongoose');
const bodyDebugger = require('debug')('app:body');
const { validate, Task, createNewTask, getRunningTask } = require('../models/tasks');

const router = express.Router();

router.post('/new', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const alreadyExists = await Task.findOne({ name: req.body.name });
    if (alreadyExists) return res.status(400).send(`${req.body.name} exists already.`);

    const task = await createNewTask(req.body);
    res.send(task);
});

router.get('/start/:name', async (req, res) => {
    bodyDebugger(req.params.name);
    const task = await Task.findOne({ name: `${req.params.name}` });

    if (!task) {
        const tasksList = await Task.find().select('name -_id');
        res.status(400).send(`There is no such task.\n${tasksList}`);
    }
    else{
        const running = await getRunningTask();
        if (running) res.status(400).send(`Your already started ${running.name}`);
        else {
            task.cur = Date.now();
            const result = await task.save();
            res.send(result);
        }
    }
});


module.exports = router;
