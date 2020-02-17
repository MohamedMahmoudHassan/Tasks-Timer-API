const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

function validate(body) {
  const Schema = {
    name: Joi.string().required()
  };

  return Joi.validate(body, Schema);
}

const Task = mongoose.model(
  "Tasks",
  new mongoose.Schema({
    name: { type: String, required: true },
    sessionsDuration: [{ type: Number }],
    runningSessionStart: { type: Number }
  })
);

async function createNewTask(body) {
  const task = new Task(_.pick(body, ["name"]));
  task.sessionsDuration = [];
  task.runningSessionStart = -1;
  const result = await task.save();
  return result;
}

async function getRunningTask() {
  const result = Task.findOne({ runningSessionStart: { $gt: 0 } });
  return result;
}

module.exports.validate = validate;
module.exports.Task = Task;
module.exports.createNewTask = createNewTask;
module.exports.getRunningTask = getRunningTask;
