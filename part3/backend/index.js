const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

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

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

morgan.token('postData', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    } else {
        return '';
    }
});

app.use(express.json())
app.use(cors())
//app.use(requestLogger)
app.use(morgan(':method :url :status :response-time ms :postData'));
app.use(express.static('dist'));


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


app.get('/info', (request, response) => {

    response.send(`<p>Phonebook has ${persons.length} persons</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 1000)
    }

    persons = persons.concat(person)

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3005
app.listen(PORT)
console.log(`Server running on port ${PORT}`)