import { useState, useEffect } from 'react'
import personService from './personService'

const Filter = ({ filter, onChange }) => (
  <div>
    filter shown with <input value={filter} onChange={onChange} />
  </div>
)

const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, onDelete }) => (
    <div>
      {persons.map(person =>
        <p key={person.id}>{person.name}: {person.number}
        <button onClick={() => onDelete(person)}>delete</button>
        </p>
      )}
    </div>
  )




const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)

    if (existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService.update(existingPerson.id, updatedPerson)
          .then(data => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : data))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    personService.create({ name: newName, number: newNumber })
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (person) => {
  if (window.confirm(`Delete ${person.name}?`)) {
    personService.
      remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }
}

  const personsToShow = filter ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) : persons
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />  
      <h2>Add a new contact</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />  
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={deletePerson} />
       
    </div>
    
  )
}



export default App