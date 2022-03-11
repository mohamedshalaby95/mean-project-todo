const router=require('express').Router();
const userControll=require('../contolls/user');





router.post("/",userControll.addUser)
router.patch("/:id",userControll.updateUser)
module.exports=router