const express = require('express')
const app = express()

//Data
let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]
//Routes
app.get('/', (request, response) => {
  response.send('<h1>Welcome to the Phonebook App</h1>')
})
//gets all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

///get a single person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
    console.error(error)
  }

})
//info route
app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for 2 people</p><br><p>${Date()}</p>`)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port https://localhost:${PORT}`)
})
