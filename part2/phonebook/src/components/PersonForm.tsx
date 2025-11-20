import type { FormEvent } from "react"

const PersornForm = ({ newName, newNumber, handleSubmit, handleNumberChange, handleNameChange }:
  {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    handleNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    newName: string,
    newNumber: string

  }) => {
  return <form onSubmit={handleSubmit}>
    <h2>Add new contact</h2>
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

export default PersornForm;
