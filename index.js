const Datastore = require('nedb')


const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')

const app = express()
/*var options = {
    key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
  }*/

app.listen(5000, '192.168.100.25')










app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))


const database = new Datastore('database.db')

database.loadDatabase()



    app.get('/api',(request,response) => {
        
        database.find({}, (err,data)=> {
            if(err){
                response.end()
                return
            } 
            response.json(data)
        })
    })



    app.post('/api',(request,response)=> {

    const data = request.body
    const time = Date.now()
    data.timestamp = time
    database.insert(data)
    
    res = {code: '200', time: time}
    response.json(res)
    
    })