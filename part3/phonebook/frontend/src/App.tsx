import Filter from './components/Filter';
import PersornForm from './components/PersonForm'
import Persons from './components/Persons';
import Notification from './components/Notification.tsx'
import entry from './services/entry.js'
import { useEffect, useState, type FormEvent } from 'react'


type personsType = {
  name: string;
  phonenumber: string;
  id: string;
}

type notiType = {
  message: string;
  type: "success" | "error";
} | null

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
  const [notification, setNotification] = useState<notiType>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phonenumber: newNumber
    }
    const foundEntry = persons.find(person => person.name === newPerson.name)
    if (foundEntry) {
      const change = confirm(`${newName} is already added to phonebook, replace the old number with the new one?`);
      if (change) {
        const updatedEntry = { ...foundEntry, phonenumber: newPerson.phonenumber }
        entry.updateEntry(foundEntry.id, updatedEntry)
          .then((res) => {
            if (res) {
              setPersons(res.data);
            }
            setNotification({ message: `Updated ${updatedEntry.name}'s number`, type: "success" });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch(() => {
            setNotification({ message: `${updatedEntry.name}'s entry was deleted`, type: 'error' });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
      }
    }
    else {
      entry.addEntry(newPerson)
        .then(res => {
          setPersons(prev => [...prev, res])
          setNotification({ message: ` Created ${newPerson.name}'s number`, type: 'success' });
        })
        .catch(err => setNotification({ message: err.response.data.error, type: 'error' }))
      setTimeout(() => {
        setNotification(null);
      }, 5000);
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
        <Notification message={`${notification.message}`} type={`${notification.type}`} />
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
