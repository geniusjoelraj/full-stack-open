const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Phone = require('./models/phone');
const requestLogger = require('./middleware/requestLogger.js')
const errorHandler = require('./middleware/errorHandler')


const app = express();
app.use(express.static('dist'))
app.use(express.json());
app.use(cors())
app.use(requestLogger)

app.get('/api/persons', (req, res) => {
  Phone.find({}).then(numbers => res.json(numbers))
})

app.get('/api/persons/info', (req, res) => {
  const numbers = Phone.find({}).then(numbers => res.json(numbers))
  res.send(`<p>Phonebook has info for ${numbers.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Phone.findById(id).then(phone => {
    if (phone) {
      res.json(phone)
    } else {
      res.status(404).end();
    }
  })
    .catch(err => next(err))
})

app.put('/api/persons/:id', async (req, res, next) => {
  const id = req.params.id;
  const person = req.body;
  await Phone.findByIdAndUpdate(id, person)
  const numbers = await Phone.find({}).then((numbers) => res.json(numbers))
    .catch(err => next(err))
  res.json(numbers);
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id;
  Phone.findByIdAndDelete(id).then(phone => {
    if (phone) {
      res.json(phone)
    } else {
      res.status(404).end();
    }
  })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const person = req.body;
  const phone = new Phone({
    name: person.name,
    phonenumber: person.phonenumber
  })
  phone.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(err => next(err))
})

app.use(errorHandler)
const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

