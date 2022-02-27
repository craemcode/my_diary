/*



//send data to the server


async function sendData() {
    const response = await fetch('/api', options)
    const resdata = await response.json()
    console.log(resdata)
}



getData()
async function getData() {
    const response = await fetch('/api')
    const data = await response.json()

    for (item of data) {
        const root = document.createElement('div')
        const time = document.createElement('div')
        const position = document.createElement('div')
        const datestring = new Date(item.timestamp).toLocaleString()


        time.textContent = datestring
        position.textContent = 'latitude: ' + item.lat + ' longitude: ' + item.lon

        root.append(time, position)
        document.body.append(root)
    }
}
*/

//first dom elements we want to manipulate
const button = document.querySelector('#start')
const div = document.querySelector('#cont')

//ensures the start button does not create multiple fields. 
let virgin = true //virgin switch technique
button.addEventListener('click', () => {
        
        if(virgin){
            addMeds()
            virgin = false
        }else(location.reload())//reload is pressed the second time
    })


//adds the dom elements to input the meditation
function addMeds() {

        const float = document.createElement('div')
        const text = document.createElement('textarea')
        const submit = document.createElement('button')
        const input = document.createElement('input')

        float.className = 'float-form'
        
        input.className = "form-control" 
        input.type="text" 
        input.placeholder="What are you thinking about in one word"
        input.id = "topic"
        
             
        text.className = 'form-control'
        text.id = 'note'
        text.placeholder = 'Write your thoughts in full. \n Be aware, the thoughts will not be deleted.'
        
        
        submit.className = 'btn btn-primary'
        submit.id = 'submit'
        submit.textContent = 'Record'
        
        //notice that the class names are bootsrap classnames. So we are churning out styled elements


        div.append(float, input, text, submit)
        
        
        //we need to make sure the buttons is clickable once if the server is okay
        let virgin = true
        submit.addEventListener('click', () => {
            if (virgin) {
                let p = sendData()
                suceessmesg.innerText = 'Please Wait...'
                p.then(() => {
                    input.readOnly = true
                    text.readOnly = true
                    virgin = false
                })
                p.catch(() => {
                    input.readOnly = false
                    text.readOnly = false
                    suceessmesg.innerText = 'Something went wrong :( check your connection'
                })
        }
         }) //clicking this button sends the data to the server
    
}


//guess i know have to learn forms
function getData() {
    if (document.querySelector('.form-control')) {
        
        const topic = document.querySelector('#topic').value
        const note = document.querySelector('#note').value

        return { topic, note }
    }
}

suceessmesg = document.querySelector('#successtext')



async function sendData() {

    const data = getData()
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),

    }//read more on requsts
   
        
        //telling us that the server has received the data
        const response = await fetch('/api', options)
        const resdata = await response.json()
        console.log(resdata)
        const datestring = new Date(resdata.time).toLocaleTimeString()
        
        
        suceessmesg.innerText = 'You recored at: ' + datestring

}

async function queryData(){
    params = 'test'
    const response = await fetch(`/search/${params}`)
    const resdata = await response.json()
    
    console.log(resdata)

}

queryData()






