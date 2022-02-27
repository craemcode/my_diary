const sqlite3 = require('sqlite3').verbose()

/*we create a topics table and a meditation table
topics table will have an ID, name(nb)

meditation table will have 
id (pk auto increment)
text(nb)
timestamp
topic id (fk to topics)
*/

let db = new sqlite3.Database('./data/diary.db', err=>{
    if(err){
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the in memory Database')          
    }
})


function insertTopic(topic){

    let sql = "INSERT INTO topics VALUES (?)"
    db.run(sql,[topic],(err)=>{
        if (err) {
            console.error(err.message)
        } else {
            console.log("row inserted!")
        }
    })
}

async function searchTopic(topic){
    let sql = "SELECT * FROM topics WHERE name=?"
    db.get(sql, [topic], (err, row) => {
        if (err) {
            console.error(err.message)
        } else {
            return row
        }
    })
}

function getAll() {
    let sqll = "SELECT * FROM topics"
    db.all(sqll, [], (err, rows) => {
        if (err) {
            console.error(err.message)
        } else {
            rows.forEach(row => console.log(row))
        }

    })
}

//db.exec('CREATE TABLE topics (name text)', ()=>console.log ('Table created successfully'))

/*db.exec("INSERT INTO topics VALUES ('test')",(err)=>{
    
    if (err){
        console.error(err.message)
    }else{
    console.log ('Entry successful created successfully')
    }
})*/




function closeDb(){
    db.close(err=>{
        if(err){
            return console.error(err.message)
        }
        console.log('Connection closed')
})
}


module.exports = { insertTopic, searchTopic, getAll, closeDb }