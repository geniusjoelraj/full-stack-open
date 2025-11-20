import axios from "axios";
import { type SetStateAction } from 'react';

type personsType = {
  name: string;
  number: string;
  id: string;
}

const addEntry = (newPerson: personsType) => {
  axios.post("http://localhost:3001/persons", newPerson)
    .then((res) => res.data)
    .then((data) => console.log(data)
    )
}

const deleteEntry = (id: string, setPersons: React.Dispatch<SetStateAction<personsType[]>>) => {
  axios
    .delete(`http://localhost:3001/persons/${id}`)
  setPersons(prev => prev.filter(person => person.id != id))
}

const updateEntry = (id: string, newPerson: personsType, setPersons: React.Dispatch<SetStateAction<personsType[]>>, persons: Array<personsType>) => {
  axios
    .put(`http://localhost:3001/persons/${id}`, newPerson)
    .then((res) => setPersons(persons.map((person) => person.id == id ? res.data : person)))
}

const getAllEntries = (): Promise<personsType[]> => {
  return axios
    .get('http://localhost:3001/persons')
    .then(res => res.data);
}


export default {
  getAllEntries,
  addEntry,
  updateEntry,
  deleteEntry
}
