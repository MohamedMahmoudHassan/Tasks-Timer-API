const express = require("express");
const bodyDebugger = require("debug")("app:body");
const {
  validate,
  Task,
  createNewTask,
  getRunningTask
} = require("../models/tasks");

const router = express.Router();

router.post("/new", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const alreadyExists = await Task.findOne({ name: req.body.name });
  if (alreadyExists)
    return res.status(400).send(`${req.body.name} exists already.`);

  const task = await createNewTask(req.body);
  res.send(task);
});

router.get("/startSession/:name", async (req, res) => {
  const task = await Task.findOne({ name: `${req.params.name}` });

  if (!task) {
    const tasksList = await Task.find().select("name -_id");
    return res.status(400).send(`There is no such task.\n${tasksList}`);
  }
  const running = await getRunningTask();
  if (running)
    return res.status(400).send(`Your already started ${running.name}`);

  task.runningSessionStart = Date.now();
  const result = await task.save();
  res.send(result);
});

router.get("/endSession", async (req, res) => {
  const task = await getRunningTask();
  if (!task) return res.status(400).send("There is no running tasks.");

  task.previous.push(Date.now() - task.runningSessionStart);
  task.runningSessionStart = -1;

  const result = await task.save();
  res.send(result);
});

router.get("/taskDetails/:name", async (req, res) => {
  const task = await Task.findOne({ name: `${req.params.name}` });

  if (!task) {
    const tasksList = await Task.find().select("name -_id");
    res.status(400).send(`There is no such task.\n${tasksList}`);
  }
  res.send(task);
});

router.get("/reset/:name", async (req, res) => {
  const task = await Task.findOne({ name: `${req.params.name}` });

  if (!task) {
    const tasksList = await Task.find().select("name -_id");
    res.status(400).send(`There is no such task.\n${tasksList}`);
  }
  task.previous = [];
  const result = await task.save();
  res.send(result);
});

module.exports = router;
