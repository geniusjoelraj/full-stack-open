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

export default Filter;
