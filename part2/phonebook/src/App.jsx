import { useState } from 'react'

const Name = (props) => {
  return(
    <div>{props.name} {props.num}</div>
    
  )
}

const Filter = (props) => <div>filter shown with <input onChange={props.on} /></div>

const PersonForm = (props) => {
  return(
    <form onSubmit={props.add}>
        <div>
          name: <input value={props.v1} onChange={props.on1}/>
        </div>
        <div>
          number: <input value={props.v2} onChange={props.on2}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => <div>{props.fil.map(person => 
<Name key={person.id} name={person.name} num={person.number}/>) }</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filterednames, setFilter] = useState('')

  const handleFilter = (event) => setFilter(event.target.value)

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumChange = (event) => setNewNum(event.target.value)

  const personsFIL = filterednames === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterednames.toLowerCase())
  )

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNum,
      id: persons.length + 1

    }
    const nameExists = persons.some(person => person.name === newName)

    if (nameExists) {
      return(
        alert(`${newName} is already added to phonebook`)
      )
    }

    setPersons(persons.concat(nameObject))
    
    setNewName('')
  }
  return (
    <>
      <h2>Phonebook</h2>
      <Filter on={handleFilter}/>
      <h3>Add a new</h3>
      <PersonForm add={addName} v1={newName} v2={newNum} on1={handleNameChange} on2={handleNumChange}/>
      <h3>Numbers</h3>
      <Persons fil={personsFIL}/>
    </>
  )
}

export default App