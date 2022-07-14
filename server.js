const express = require('express')
const app = express()
const cors = require('cors')
const moment = require('moment')
require('dotenv').config()
const date = require('date-and-time')
const res = require('express/lib/response')
const MongoClient = require('mongodb').MongoClient

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cors())
app.set('view engine', 'ejs')
const PORT = process.env.PORT || 3000

let db,
connectionString = process.env.DB_STRING,
dbName = 'todoApp'
MongoClient.connect(connectionString).then(client => {
    db = client.db(dbName)
    console.log(`mongo db is connected to ${dbName} database`)
}).catch(error => console.log(error))

const currentTime  = moment().format("MM/DD/YYYY HH:mm:ss")

app.get('/addtodo', (request,response) => {
    response.render('addtodo.ejs')
})

app.get('/', (request,response) => {
  const cursor =db.collection('eventtable').find().toArray().then(
        result => {
            response.render('index.ejs',{result})
        }
    ).catch(error => console.log(error))
})

app.delete('/deletepost', (request,response)=> {
    let description = request.body.description
    console.log(request.body)
    db.collection('eventtable').deleteOne({description: description}).then(result=> {
        if(result.deletedCount === 0){
            response.json('records does not match')
        }
        else{
            response.json('records deleted successfully')
        }
        
    })
})
app.get('/', (request,response) => {
    if(request.method !=='GET'){
        response.status('404').json({message : 'method not allowed'})
    }
    const result = db.collection('eventtable').find.toArray()
        response.status(200).json({result})
})

app.post('/addtodo', (request,response)=> {
    const body = request.body
   db.collection('eventtable').insertOne({
       description : body.description, title : body.title, currentTime : currentTime, time:body.time
   }).then(res => {
       if(res){
           response.status(200).json('added successfully')
        //    console.log('added successfully')
        //    response.redirect('index')
       }
   }).catch(error => console.log(error))
})

app.get('/edittodo', (request,response) => {
    response.render('edittodo.ejs')
})
app.get('/getpost/:title', (request,response) => {
    const title = request.params.title
    db.collection('eventtable').findOne({title: title}).then(result=> {
        response.render('edittodo.ejs',{result})
    }) 
})

app.listen(PORT, () => {
    console.log(`server is listenig on port ${PORT}`)
})