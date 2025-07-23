
// main server file
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.static('dist'))

app.use(cors())              // <--- CORS must be before any routes
app.use(express.json())      // <--- json-parser  -> to define the body of the request
// takes json data of the request, tranform to JS obj, attach to the body part





// temporary databasse (for now)
let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET tttt and POST are the most important methods of HTTP protocol",
    important: true
  }
]

/*
without express hv to specify type...

const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
*/


//API! - menu + chef

//fetches -> can just visit the url (request sender = browser)
app.get('/', (request, response) => {
  response.send('<h1>Hello Worlddd!</h1>')
})
/* You're telling the backend server to 
send that HTML string as a response to any 
browser that visits http://localhost:3001/.
*/


app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

// remove the resource

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

// add notes

const generateId = () => {
  // create a new array of ids and then find the max val
  // ('...') chnages array to numbers so it can be a parameter for math.max
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id))) 
    : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' //avoid empty
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(), //default = false
  }

  notes = notes.concat(note)

  response.json(note)
})


// waiter ready to serve!
// choose port and runn

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

