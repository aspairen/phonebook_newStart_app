const express = require('express')
const morgan = require('morgan')

const app = express()

const cors = require('cors')

app.use(cors())

app.use(express.json())

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

// Custom token for logging request body
morgan.token('body-data', (req, res) => {
  if (req.method === 'POST') {
    // Access the request body
    const body = req.body;

    if (body) {
      return JSON.stringify(body);
    } else {
      return 'Empty body';
    }
  } else {
    return '-'; // Indicate not a POST request
  }

})

// Use morgan with custom format
app.use(morgan(':method :url :status :res[content.length] - :response-time ms :body-data'));

// Routes
app.get('/', (request, response) => {
  response.send('<h1>Welcome to the Phonebook App</h1>')
})
// info route
app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for 2 people</p><br><p>${Date()}</p>`)
})
// gets all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// get a single person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
    console.log(error)
  }

})
//delete
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
app.post('/api/persons', (request, response) => {
  const body = request.body
  // Check for missing name or number
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  // Check for existing name
  const existingPerson = persons.find(person => person.name === body.name);
  if (existingPerson) {
    return response.status(409).json({ error: 'name must be unique' })
  }

  function GenerateRandomId() {
    return Math.random().toString(36).substring(2, 9);
}
  const uniqueId = GenerateRandomId();
  


  const newPerson = { ...body, id: uniqueId }
  

  // Add new person to persons array
  persons = persons.concat(newPerson)

  
  response.json(newPerson);
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port https://localhost:${PORT}`)
})
