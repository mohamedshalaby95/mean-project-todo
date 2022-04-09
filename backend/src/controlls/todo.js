const toDoValidation = require("../validations/todo");
require("dotenv/config");
const todoModel = require("../models/todo");
const _ = require("lodash");
const redis = require("redis");
// const {promisify}=require('util')
const redis_port = process.env.redis_port || 6379;

const client = redis.createClient({
  host: `${process.env.Dev_redis_host}`,
  port: redis_port,
});

async function addToDo(req, res) {
  const { error } = toDoValidation(req.body);
  if (error) {
    res.status(401);
    throw new Error(`${error.details[0].message}`);
  }

  let todo = new todoModel({
    name: req.body.name,
    title: req.body.title,
    discription: req.body.discription,
    user: req.user,
  });
  todo = await todo.save();
  todo = _.pick(todo, ["name", "description", "_id", "title"]);

  res.send(_.pick(todo, ["_id"]));

  await client.connect();
  const dataCashe = await client.get("todos");

  if (dataCashe) {
    let datas = JSON.parse(dataCashe);

    let newCash = [{ ...datas }, todo];
    await client.flushAll();

    await client.set(
      "todos",
      JSON.stringify(newCash),
      {
        EX: 1000,

        NX: true,
      },
      redis.print
    );

    await client.disconnect();
  } else {
    await client.disconnect();
  }
}

async function updateToDo(req, res) {
  let todo = await todoModel.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      title: req.body.title,
      discription: req.body.discription,
    },
  });

  todo = await todo.save();

  res.send(_.pick(todo, ["_id"]));
}

async function getToDos(req, res) {
  let todos = await todoModel.find({ user: req.user });

  await client.connect();
  await client.set("todos", JSON.stringify(todos), {
    EX: 1000,

    NX: true,
  });

  await client.disconnect();

  res.send(todos);
}
async function getToDo(req, res) {
  let todo = await todoModel.findById(req.params.id);
  res.send(todo);
}
async function deleteToDo(req, res) {
  let todo = await todoModel.findByIdAndDelete(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error(`not found this todo list`);
  }
  res.send(todo);
}

module.exports = { addToDo, updateToDo, getToDos, getToDo, deleteToDo };
