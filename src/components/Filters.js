import React, { useState } from 'react';

const Filters = ({ onFilterChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (e) => {
    const type = e.target.value;
    onFilterChange(type);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div>
      <select onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="burner">Burner</option>
        <option value="subscription">Subscription</option>
        <option value="blocked">Blocked</option>
      </select>
      <input type="text" placeholder="Search by card name" value={searchTerm} onChange={handleSearch} />
    </div>
  );
};

export default Filters;
