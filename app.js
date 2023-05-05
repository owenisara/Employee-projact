const express = require('express')
const path = require('path')
const router = require('./router/router')
const app = express()
 const indexpage = path.join(__dirname,'./public/index.html')

 app.set('views',path.join('views'))
 app.set('view engine','ejs')


 app.use(express.urlencoded({extended:false}))

 app.use(express.static(path.join(__dirname,'public')))

app.use(router)
app.listen(3000,()=>{
    console.log('Connect to port 3000')
})