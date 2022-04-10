const router=require('express').Router()
const todoControll=require('../controlls/todo')
const auth=require('../middelewares/auth')
const {DeleteFromCash,updateFromCash,casheToDos}=require('../middelewares/cacheMiddleware')






router.post("/",[auth],todoControll.addToDo)
router.patch("/:id",[auth,updateFromCash],todoControll.updateToDo)
router.get("/",[auth,casheToDos],todoControll.getToDos)
router.get("/:id",[auth],todoControll.getToDo)
router.delete("/:id",[auth,DeleteFromCash],todoControll.deleteToDo)
module.exports=router