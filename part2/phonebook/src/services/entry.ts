import axios from "axios";
import { type SetStateAction } from 'react';

type personsType = {
  name: string;
  number: string;
  id: string;
}

const baseURL = "/api/persons"


const addEntry = (newPerson: any, setPersons: React.Dispatch<React.SetStateAction<personsType[]>>) => {
  axios.post(baseURL, newPerson)
    .then((res) => res.data)
    .then((data) => setPersons(data)
    )
}

const deleteEntry = (id: string, setPersons: React.Dispatch<SetStateAction<personsType[]>>) => {
  axios
    .delete(`${baseURL}/${id}`)
  setPersons(prev => prev.filter(person => person.id.toString() != id.toString()))
}

const updateEntry = (id: string, newPerson: personsType, setPersons: React.Dispatch<SetStateAction<personsType[]>>, persons: Array<personsType>) => {
  return axios
    .put(`${baseURL}/${id}`, newPerson)
    .then((res) => setPersons(persons.map((person) => person.id == id ? res.data : person)))
    .catch(err => {
      `Note ${newPerson.name} was already deleted`;
      console.log(err);

    })
}

const getAllEntries = (): Promise<personsType[]> => {
  return axios
    .get(baseURL)
    .then(res => res.data);
}


export default {
  getAllEntries,
  addEntry,
  updateEntry,
  deleteEntry
}
