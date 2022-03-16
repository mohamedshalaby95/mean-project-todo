const express=require('express')
require('express-async-errors');
const app=express()
const userRouter=require('./src/routes/users')
const handleError=require('./src/middelewares/handelError')
const todoRouter=require('./src/routes/todo')
const authRouter=require('./src/routes/login')
const responseTime=require('response-time')
var cors = require('cors')


const port=process.env.Port||3000

 app.use(cors())
//  {origin: 'http://localhost:4200',
//  optionsSuccessStatus: 200 }


require('dotenv/config')
require('./config/connectdb')()


app.use(express.json())
app.use(responseTime())
app.use('/user',userRouter)
app.use('/todo',todoRouter)
app.use('/login',authRouter)
app.use(handleError)






app.listen(port,(error)=>{
    if(error) console.log("error on server")
     console.log(`server listen on ${port}`)
    
})