import Filter from './components/Filter';
import PersornForm from './components/PersonForm'
import Persons from './components/Persons';
import Notification from './components/Notification.tsx'
import entry from './services/entry'
import { useEffect, useState, type FormEvent } from 'react'

type personsType = {
  name: string;
  number: string;
  id: string;
}

const App = () => {
  useEffect(() => {
    entry.getAllEntries()
      .then(data => {
        setPersons(data);
      })
  }, [])
  const [persons, setPersons] = useState<Array<personsType>>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPerson = {
      id: (persons.length + 1).toString(),
      name: newName,
      number: newNumber
    }
    const foundEntry = persons.find(person => person.name === newPerson.name)
    if (foundEntry) {
      const change = confirm(`${newName} is already added to phonebook, replace the old number with the new one?`);
      if (change) {
        const updatedEntry = { ...foundEntry, number: newPerson.number }
        entry.updateEntry(foundEntry.id, updatedEntry, setPersons, persons)
          .then(() => {
            setNotification(`Updated ${updatedEntry.name}'s number`);
            setTimeout(() => {
              setNotification('');
            }, 2000);
          })
          .catch(() => {
            setNotification(`${updatedEntry.name}'s entry was deleted`);
            setTimeout(() => {
              setNotification('');
            }, 2000);
          })
      }
    }
    else {
      setPersons(persons.concat(newPerson));
      entry.addEntry(newPerson);
      setNotification(` Created ${newPerson.name}'s number`);
      setTimeout(() => {
        setNotification('');
      }, 2000);
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

      <PersornForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber} />

      {notification ?
        <Notification message={`${notification}`} />
        :
        null
      }

      <Persons
        persons={persons}
        filter={filter}
        deleteEntry={entry.deleteEntry}
        setPersons={setPersons} />
    </div>
  )
}

export default App
