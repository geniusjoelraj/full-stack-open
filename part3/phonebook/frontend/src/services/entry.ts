import axios from "axios";
import type { SetStateAction } from "react";

type personsType = {
  name: string;
  phonenumber: string;
  id: string;
}

const baseURL = "/api/persons"



const addEntry = (newPerson: { name: string, phonenumber: string }) => {
  return axios.post(baseURL, newPerson)
    .then((data) => data.data)
}

const deleteEntry = (id: string, setPersons: React.Dispatch<SetStateAction<personsType[]>>) => {
  axios
    .delete(`${baseURL}/${id}`)
  setPersons(prev => prev.filter(p => p.id !== id))
}

const updateEntry = (id: string, newPerson: personsType) => {
  return axios
    .put(`${baseURL}/${id}`, newPerson)
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
