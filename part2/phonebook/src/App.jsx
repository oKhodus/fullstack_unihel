import { useState, useEffect } from 'react'
import personService from './services/server'
import {Name, Filter, PersonForm, Persons} from './components/elems'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterednames, setFilter] = useState('')

  useEffect(() => {
    personService
      .getall()
      .then(
        initialResponse => {
          setPersons(initialResponse)
        }
      )
  }, [])

  const handleFilter = (event) => setFilter(event.target.value)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumChange = (event) => setNewNum(event.target.value)

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.del(id).then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  const personsFIL = filterednames === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterednames.toLowerCase())
  )

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNum,
      id: `${persons.length + 1}`

    }
    const nameExists = persons.some(person => person.name === newName)
    const NumExists = persons.some(person => person.number === newNum)

    if (nameExists && !NumExists) {
      const person2UPD = persons.find(p => p.name === newName)
      const UPDedPerson = {...person2UPD, number: newNum}

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return(
          console.log('confirmed, new phone num'),
          personService
          .update(person2UPD.id, UPDedPerson)
          .then( person => {
            setPersons(persons.map(p => p.id !== person2UPD.id ? p : person))
            setNewName('')
            setNewNum('')
          })
        )
      }
      else return(
        console.log("canceled adding new num"),
        setNewName(''),
        setNewNum('')
      )
    }

    if (nameExists) {
      return(
        alert(`${newName} is already added to phonebook`)
      )
    }

    personService
    .create(nameObject)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNum('')
    })

  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter on={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm add={addName} v1={newName} v2={newNum} on1={handleNameChange} on2={handleNumChange}/>
      <h3>Numbers</h3>
      <Persons fil={personsFIL} on={handleDelete}/>
    </>
  )
}

export default App