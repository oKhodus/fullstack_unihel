import { useState, useEffect } from 'react'
import personService from './services/server'
import {Name, Filter, PersonForm, Persons} from './components/elems'

const Notification = ({msg, type}) => {
  const notifStyle = {
    color: type === 'error' ? 'red' : 'green',
    fontStyle: 'Arial',
    fontSize: '20px',
    borderStyle: 'solid',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px'
  }

  if (msg === null) {
    return null
  }
  return(
    <div className='notif' style={notifStyle}>
      {msg}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterednames, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [mesType, setmesType] = useState(null)

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
            personService
          .update(person2UPD.id, UPDedPerson)
          .then( person => {
            setPersons(persons.map(p => p.id !== person2UPD.id ? p : person))
            setNewName('')
            setNewNum('')
            setMessage(`${newName} has changed number to ${newNum}`)
            setmesType('success')
            setTimeout(() => {
              setMessage(null)
              setmesType(null)
            }, 4000)
          })
          .catch(error => { 
            setMessage(`${newName} was already removed from server`)
            setmesType('error')
            setTimeout(() => {
              setMessage(null)
              setmesType(null)
            }, 4000)
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
      setMessage(`Added ${newName}`)
      setTimeout(() => setMessage(null), 4000)
    })

  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification msg={message} type={mesType}/>
      <Filter on={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm add={addName} v1={newName} v2={newNum} on1={handleNameChange} on2={handleNumChange}/>
      <h3>Numbers</h3>
      <Persons fil={personsFIL} on={handleDelete}/>
    </>
  )
}

export default App