import React, { useState } from 'react';

const Autocomplete = ({ items }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    const filtered = items.filter(item => item.toLowerCase().includes(value.toLowerCase()));
    setFilteredItems(filtered);
  };

  const handleItemClick = (item) => {
    setInputValue(item);
    setFilteredItems([]);
  };

  console.log('ITEMS: ', items)

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search"
        className="autocomplete-input"
      />
      <ul className="autocomplete-list">
        {filteredItems.map((item, index) => (
          <li
            key={index}
            className="autocomplete-item"
            onClick={() => handleItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
