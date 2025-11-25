const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Phone = require('./models/phone');
const requestLogger = require('./middleware/requestLogger')


const app = express();
app.use(express.static('dist'))
app.use(express.json());
app.use(cors())
app.use(requestLogger)

app.get('/api/persons', (req, res) => {
  Phone.find({}).then(numbers => res.json(numbers))
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  // const person = persons.find(person => person.id.toFixed() === id);
  Phone.findById(id).then(phone => {
    if (phone) {
      res.json(phone)
    } else {
      res.status(404).end();
    }
  })
})

app.put('/api/persons/:id', async (req, res) => {
  const id = req.params.id;
  const person = req.body;
  await Phone.findByIdAndUpdate(id, person)
  const numbers = await Phone.find({}).then((numbers) => res.json(numbers))
  res.json(numbers);
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  Phone.findByIdAndDelete(id).then(phone => {
    if (phone) {
      res.json(phone)
    } else {
      res.status(404).end();
    }
  })
})

app.post('/api/persons', (req, res) => {
  const person = req.body;
  if (!person.name) {
    res.status(400).json({
      error: "Name is required"
    })
  }
  else if (!person.phonenumber) {
    res.status(400).json({
      error: "Number is required"
    })
  }
  else {
    const phone = new Phone({
      name: person.name,
      phonenumber: person.phonenumber
    })
    phone.save().then(savedPerson => {
      res.json(savedPerson)
    })
  }
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

