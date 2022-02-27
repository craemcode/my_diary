const express = require('express')
const database = require('./db')

const app = express()
/*var options = {
    key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
  }*/

PORT = 5000
app.listen(PORT,()=>console.log(`Server running on ${PORT}`))



app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))







app.get('/search/:name', (request, response) => {

    const parameter = request.params.name
    console.log(parameter)
    const result = database.searchTopic(parameter)
    result.then((row)=>console.log(row))
    result.catch((error)=>console.error(error.message))

    res = {code: 200}
    response.json(res)

    })



app.post('/api', (request, response) => {

    const data = request.body
    const time = Date.now()
    data.timestamp = time
    database.insert

    res = { code: '200', time: time }
    response.json(res)

})