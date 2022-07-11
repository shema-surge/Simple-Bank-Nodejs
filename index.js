import express from 'express'
import dotenv from 'dotenv'
import { getAllAccounts,createAccount,deleteAccount, deposit, withdraw } from './accountActions.js'
dotenv.config()
const app = express()

app.use(express.json())

app.get('/accounts',(req,res)=>{
    try{
        res.json(getAllAccounts())
    }catch(err){
        console.log(err)
    }
})


app.post('/accounts',(req,res)=>{
    try{
        createAccount(req.body.name,req.body.age)
    }catch(err){
        console.log(err)
    }
})

app.delete('/accounts/:id',(req,res)=>{
    try{
        deleteAccount(req.params.id)
    }catch(err){
        console.log(err)
    }
})

app.patch('/accounts/deposit',(req,res)=>{
    try{
        deposit(req.body.id,req.body.amount)
    }catch(err){
        console.log(err)
    }
})

app.patch('/accounts/withdraw',(req,res)=>{
    try{
        withdraw(req.body.id,req.body.amount)
    }catch(err){
        console.log(err)
    }
})

app.listen(process.env.PORT,()=>{console.log(`listening on port: ${process.env.PORT}`)})