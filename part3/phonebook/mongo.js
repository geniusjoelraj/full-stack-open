const mongoose = require('mongoose');

if (process.argv.length < 5 && process.argv.length > 3) {
  console.log("node mongoose <password> <name> <phonenumber>");
}


const pass = process.argv[2];

const uri = `mongodb+srv://fso:${pass}@cluster0.btn0y9w.mongodb.net/?appName=Cluster0`;

mongoose.set('strictQuery', false);

mongoose.connect(uri, { family: 4 })

const phoneSchema = new mongoose.Schema({
  name: String,
  phonenumber: Number
})

const Phone = new mongoose.model('Phonenumber', phoneSchema);

if (process.argv.length < 4) {
  Phone.find({}).then(res => {
    res.forEach(phone => {
      console.log(`Name: ${phone.name}`);
      console.log(`Number: ${phone.phonenumber}`)
    })
    mongoose.connection.close()
  })
} else {
  const phone = new Phone({
    name: process.argv[3],
    phonenumber: process.argv[4]
  })

  phone.save().then(res => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}

