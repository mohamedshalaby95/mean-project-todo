const redis=require('redis');
const redis_port=process.env.redis_port||6379;
require('dotenv/config')

const client=redis.createClient({
  host:`${process.env.Dev_redis_host}`,
  port:redis_port
})

async function casheToDos(req,res,next){
    await client.connect();

const dataCashe=await client.get('todos')
if(dataCashe){
    console.log("here from midle ware success")
    
    res.send(dataCashe)
    await client.disconnect();
    return
}
else{
    await client.disconnect();

    console.log("here from midle ware not success")
    next()
}

}


async function casheToDo(req,res,next){
    await client.connect();

const dataCashe=await client.get('todo')
if(dataCashe){
    console.log(dataCashe)
 
    res.send(dataCashe)
    await client.disconnect();
    return
}
else{
    await client.disconnect();

    console.log("todo not success")
    next()
}

}

module.exports={casheToDos,casheToDo }