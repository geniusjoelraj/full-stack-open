import type { SetStateAction } from "react";

type personsType = {
  name: string;
  phonenumber: string;
  id: string;
}

const Persons = ({ persons, filter, deleteEntry, setPersons }: { persons: Array<personsType>, filter: string, deleteEntry: (id: string, setPersons: React.Dispatch<SetStateAction<personsType[]>>) => void, setPersons: React.Dispatch<SetStateAction<personsType[]>> }) => {
  return <>
    <h2>Numbers</h2>
    {persons.filter((p) =>
      p.name.toLowerCase().includes(filter))
      .map((person) =>
        <p
          key={person.id}
        >
          {person.name} {person.phonenumber} &nbsp;
          <button onClick={() => {
            deleteEntry(person.id, setPersons)
          }}>
            delete
          </button>
        </p>
      )}
  </>

}

export default Persons;
