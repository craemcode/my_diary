const express = require('express')
const Datastore = require('nedb')


const app = express()
app.listen(3000, ()=> console.log('server listening'))

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