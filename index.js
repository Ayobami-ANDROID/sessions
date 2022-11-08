const express = require('express')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 4000
require('dotenv').config()

const oneDay = 1000*60*60*24

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(sessions({
    secret:process.env.session_secret,
    cookie:{maxAge:oneDay},
    saveUninitialized:true,
    resave:false,
}))

app.use(cookieParser())

const myUsername = 'Ayobami'
const myPassword = '8L9AWKKtA!'
var session

app.get('/',(req,res)=>{
    session= req.session
    if(session.userid){
        res.send("welcome user <a href=\'/logout'>click to logout</a>")
    }else{
        res.sendFile(path.join(__dirname,'public','index.html'))
    }
})

app.post('/user',(req,res)=>{
    if(req.body.username === myUsername && req.body.password === myPassword){
        session = req.session
        session.userid = req.body.username
        console.log(session)
        res.send("Hey there, welcome <a href=\'/logout'")
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
})
 app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
 })