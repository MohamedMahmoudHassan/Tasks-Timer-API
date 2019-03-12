const mongoose = require('mongoose');
const Joi = require('joi');

function validate(body) {
    const Schema = {
        name: Joi.string().required(),
    };

    return Joi.validate(body, Schema);
}

const Task = mongoose.model('Tasks', new mongoose.Schema({
    name: { type: String, required: true },
    previous: [{ type: Number }],
    cur: { type: Number },
}));

async function createNewTask(body) {
    const task = new Task(body);
    const result = await task.save();
    return result;
}

module.exports.validate = validate;
module.exports.Task = Task;
module.exports.createNewTask = createNewTask;
