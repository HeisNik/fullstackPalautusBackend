const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const argName = process.argv[3]
const argNumber = process.argv[4]

const url =
  `mongodb+srv://nikoheiska:${password}@cluster0.jljuwdm.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)


const person = new Person({
  name: argName,
  number: argNumber,
})


if (argName === undefined) {
  console.log('Phonebook:')
  Person
    .find({})
    .then(persons => {
      persons.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })

} else {

  person
    .save()
    .then(() => {
      console.log(`added ${argName} number ${argNumber} to phonebook`)
      mongoose.connection.close()
    })
}
