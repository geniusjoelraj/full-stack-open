import { useState, type FormEvent } from 'react'

const Filter = ({ filter, handleFilterChange }:
  {
    filter: string,
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }) =>
  <div>
    filter: <input
      type="text"
      value={filter}
      onChange={handleFilterChange} />
  </div>

const PersornForm = ({ newName, newNumber, handleSubmit, handleNumberChange, handleNameChange }:
  {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    newName: string,
    newNumber: string

  }) => {
  return <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} name='name' />
      <br />
      number: <input value={newNumber} onChange={handleNumberChange} name='number' />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

type personsType = {
  name: string;
  number: string;
  id: number;
}

const Persons = ({ persons, filter }: { persons: Array<personsType>, filter: string }) => {
  return <>
    {persons.filter((p) => p.name.toLowerCase().includes(filter)).map((person) => <p key={person.id}>{person.name} {person.number}</p>)}
  </>

}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }
    const nameExists = persons.some(person => {
      return person.name === newName;
    })
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    }
    else {
      setPersons(persons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
  }
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNumber(event.target.value);
  }
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add new contact</h2>
      <PersornForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber} />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
