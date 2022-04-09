const redis = require("redis");
const toDoValidation = require("../validations/todo");
const redis_port = process.env.redis_port || 6379;
require("dotenv/config");

const client = redis.createClient({
  host: `${process.env.Dev_redis_host}`,
  port: redis_port,
});

async function casheToDos(req, res, next) {
  await client.connect();

  const dataCashe = await client.get("todos");

  if (dataCashe) {
    let datas = JSON.parse(dataCashe);
    res.send(datas);
    await client.disconnect();
    return;
  } else {
    await client.disconnect();
    next();
  }
}

async function DeleteFromCash(req, res, next) {
  await client.connect();

  const dataCashe = await client.get("todos");

  let datas = JSON.parse(dataCashe);

  const newCash = datas.filter((el) => {
    return el._id !== req.params.id;
  });

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
  next();
}

async function updateFromCash(req, res, next) {
  // const {error}=toDoValidation(req.body)
  // if(error){

  //     res.status(401);
  //     throw new Error(`${error.details[0].message}`);
  // }
  await client.connect();

  const dataCashe = await client.get("todos");
  if (dataCashe) {
    let datas = JSON.parse(dataCashe);

    const indexUpdate = datas.findIndex((el) => el._id === req.params.id);
    datas[indexUpdate].title = req.body.title;
    datas[indexUpdate].discription = req.body.discription;
    datas[indexUpdate].name = req.body.name;

    await client.flushAll();

    await client.set(
      "todos",
      JSON.stringify(datas),
      {
        EX: 1000,

        NX: true,
      },
      redis.print
    );

    await client.disconnect();
    next();
  } else {
    await client.disconnect();
    next();
  }
}

module.exports = { casheToDos, DeleteFromCash, updateFromCash };
