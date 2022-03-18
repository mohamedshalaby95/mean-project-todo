const toDoValidation = require("../validations/todo");
require('dotenv/config');
const todoModel = require("../models/todo");
const _ = require("lodash");
const redis=require('redis');
// const {promisify}=require('util')
const redis_port=process.env.redis_port||6379;

const client=redis.createClient({
  host:`${process.env.Dev_redis_host}`,
  port:redis_port
})




async function addToDo(req,res){

const {error}=toDoValidation(req.body)
if(error){

    res.status(401);
    throw new Error(`${error.details[0].message}`);
}
//_.pick(req.body, ["name", "title", "discription"])
let todo=new todoModel( {"name":req.body.name,"title":req.body.title,"discription":req.body.discription,"user":req.user})
todo=await todo.save();
res.send(_.pick(todo, ["id"]))
}

async function updateToDo(req,res){
    
    const {error}=toDoValidation(req.body)
    if(error){
    
        res.status(401);
        throw new Error(`${error.details[0].message}`);
    }
    
    let todo=await todoModel.findByIdAndUpdate(req.params.id, {
        $set: {
          name: req.body.name,
          title: req.body.title,
          discription: req.body.discription,
          
        },
      })
  
    
    todo=await todo.save();
   
    res.send(_.pick(todo, ["id"]))
    }

    async function getToDos(req,res){
      
       
        let todos=await todoModel.find({user:req.user});
      
        await client.connect();
       await  client.set('todos',JSON.stringify(todos),{
        EX: 6000,
        
        NX: true
      });
       

        await client.disconnect();
        // console.log('from routes')

        res.send(todos)

    }
    async function getToDo(req,res){
       
        let todo=await todoModel.findById(req.params.id);

        await client.connect();
        await  client.set('todo',JSON.stringify(todo),{
         EX: 10,
         NX: true
       });
        
 
         await client.disconnect();
         console.log('from routes')
        res.send(todo)

    }
    async function deleteToDo(req,res){
       
        let todo=await todoModel.findByIdAndDelete(req.params.id);
        if(!todo){
            res.status(400);
            throw new Error(`not found this todo list`);
        }
        res.send(`delete successfull ${todo._id}` )

    }

module.exports={addToDo,updateToDo,getToDos,getToDo,deleteToDo}