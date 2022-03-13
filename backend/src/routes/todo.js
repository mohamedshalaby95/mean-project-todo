const router=require('express').Router()
const todoControll=require('../controlls/todo')
const auth=require('../middelewares/auth')
const {casheToDos,casheToDo}=require('../middelewares/cacheMiddleware')





router.post("/",auth,todoControll.addToDo)
router.patch("/:id",auth,todoControll.updateToDo)
router.get("/",[auth,casheToDos],todoControll.getToDos)
router.get("/:id",[auth,casheToDo],todoControll.getToDo)
router.delete("/:id",auth,todoControll.deleteToDo)
module.exports=router