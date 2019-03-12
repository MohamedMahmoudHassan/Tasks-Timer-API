const express = require('express');
const mongoose = require('mongoose');
const bodyDebugger = require('debug')('app:body');
const { validate, Task, createNewTask } = require('../models/tasks');

const router = express.Router();

router.post('/new', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const alreadyExists = await Task.findOne({ name: req.body.name });
    if (alreadyExists) return res.status(400).send(`${req.body.name} exists already.`);

    const task = await createNewTask(req.body);
    res.send(task);
});

module.exports = router;
