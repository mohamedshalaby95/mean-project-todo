const router=require('express').Router()
const {login}=require('../contolls/login')

router.post('/',login)

module.exports=router
