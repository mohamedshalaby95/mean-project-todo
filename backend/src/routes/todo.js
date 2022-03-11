const router=require('express').Router()
const todoControll=require('../controlls/todo')
const auth=require('../middelewares/auth')




router.post("/",auth,todoControll.addToDo)
router.patch("/:id",auth,todoControll.updateToDo)
router.get("/",auth,todoControll.getToDos)
router.get("/:id",auth,todoControll.getToDo)
router.delete("/:id",auth,todoControll.deleteToDo)
module.exports=router