const express = require('express')
const app = express()
app.use(express.json())

const morgan = require('morgan')


const postBody = (request, response, next) => {
  if (request.method === 'POST' && request.body) {
    request.postBody = JSON.stringify(request.body)
  }
  next()
}

app.use(postBody)

app.use(morgan((tokens, request, response) => [
  tokens.method(request, response),
  tokens.url(request, response),
  tokens.status(request, response),
  tokens.res(request, response, 'content-length'), '-',
  tokens['response-time'](request, response), 'ms',
  request.postBody ? `${request.postBody}` : '' 
].join(' ')))


let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": "1"
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": "2"
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": "3"
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": "4"
      },
      {
        "name": "Kalle Palander",
        "number": "39-23-6423122",
        "id": "5"
      }
    ]


    const requestLogger = (request, response, next) => {
      console.log('Method:', request.method)
      console.log('Path:  ', request.path)
      console.log('Body:  ', request.body)
      console.log('---')
      next()
    }



    
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    console.log('params',request)
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    
})

app.get('/info', (request, response) => {
    const time = new Date();
    console.log(time)
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${time}</p>`)
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


const generateId = () => {
  const id = persons.length > 0 
    ? Math.floor(Math.random() * 100000)
    : 0
    console.log('id', id)

    return id.toString()
}


app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
    
    const nameInList = persons.find(person => person.name === body.name)

    if (nameInList) {
      return response.status(400).json({ 
        error: 'Person is already in the phonebook' 
      })
    }
    
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }

    console.log('person ID', person.id)

    persons = persons.concat(person)

    response.json(person)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
  