const express = require('express')
const app = express()

 app.use(express.json()) 

let persons = [
  { id: 1, name: 'John Doe', age: 30 , number: 1234567890},
  { id: 2, name: 'Jane Smith', age: 25 , number: 987654321},
  { id: 3, name: 'Alice Johnson', age: 28 , number: 1122334455},
  { id: 4, name: 'Bob Brown', age: 35 , number: 5555555555 }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
}) 

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
}  )

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'name or number is missing' 
    })
  }
  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const newPerson = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})


const PORT = 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
