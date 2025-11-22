const express = require('express');
var morgan = require('morgan')

const app = express();
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]
app.get('/api/persons', (req, res) => {
  res.status(200).json(persons);
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id.toFixed() === id);
  if (person) {
    res.status(200).send(person);
  } else {
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);
  res.send(persons);
})

app.post('/api/persons', (req, res) => {
  const person = req.body;
  if (!person.name) {
    res.status(400).json({
      error: "Name is required"
    })
  }
  else if (!person.number) {
    res.status(400).json({
      error: "Number is required"
    })
  }
  else if (persons.some(p => p.name == person.name)) {
    res.status(400).json({
      error: "Name must be unique"
    })
  } else {
    person.id = Math.floor(Math.random() * 100);
    persons.push(person);
    res.json(persons);
  }
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
