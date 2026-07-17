const express = require('express')
const app = express()

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

const PORT = 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
