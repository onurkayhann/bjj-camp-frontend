import React, { useState, useEffect, Fragment } from 'react';

const Radiobox = ({ CampPrices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };

  return CampPrices.map((price, index) => (
    <div key={index}>
      <input
        onChange={handleChange}
        value={`${price._id}`}
        name={price}
        type='radio'
        className='mr-2 ml-4'
      />
      <label className='form-check-label'>{price.name}</label>
    </div>
  ));
};

export default Radiobox;
