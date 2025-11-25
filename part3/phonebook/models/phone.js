const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const uri = process.env.MONGO_URI

mongoose.connect(uri, { family: 4 })
  .then(res => {
    console.log("Connected successfully")
  })
  .catch(err => console.log("Error connecting to mongodb: " + err.message))

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  phonenumber: {
    type: String,
    minLength: 10,
    required: true
  }
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonenumbers', phoneSchema)
