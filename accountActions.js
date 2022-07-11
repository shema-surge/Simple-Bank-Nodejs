import fs from 'node:fs'
import { nanoid } from 'nanoid'

export function getAllAccounts(){
    let data = fs.readFileSync('data.json','utf8')
    if(data){
        return JSON.parse(data)
    }
    return null
}

export function getAccount(id){
    if(getAllAccounts()){
        let account = getAllAccounts().find(acc=>acc.id===id)
        if(account){
            return account
        }
    }
    return undefined
}

function updateJSON(array){
    fs.writeFile('data.json',JSON.stringify(array),(error)=>{
        console.log(error)
    })
}

export function deposit(id,amount){
    let accounts = []
    if(getAllAccounts()){
        accounts = getAllAccounts()
        let acc = accounts.find(acc=>acc.id===id)
        if(acc){
            acc.balance+=amount
            updateJSON(accounts)
        }
    }
}

export function withdraw(id,amount){
    let accounts = []
    if(getAllAccounts()){
        accounts = getAllAccounts()
        let acc = accounts.find(acc=>acc.id===id)
        if(acc){
            if(acc.balance>=amount){
                acc.balance-=amount
                updateJSON(accounts)
            }else{
                return new Error(`Insufficient funds`)
            }
        }
    }
}


export function createAccount(accName,accAge){
    let accounts = []
    if(getAllAccounts()){
        accounts = getAllAccounts()
    }
    let newAccount = {
        id:nanoid(4),
        name:accName,
        age:accAge,
        balance:0
    }
    accounts.push(newAccount)
    updateJSON(accounts)
}

export function checkBalance(id){
    if(getAccount(id)){
        return getAccount(id).balance
    }
    return new Error(`Couldn't find account with Id: ${id}`)
}

export function deleteAccount(id){
    let accounts = []
    let num = 0
    if(getAllAccounts()){
        accounts = getAllAccounts()
        let index = accounts.findIndex(acc=>acc.id===id)
        console.log(index)
        if(index>=0){
            accounts.splice(index,1)
            console.log(accounts)
            updateJSON(accounts)
        }else{
            return new Error(`This account does not exit`)
        }
    }
}

