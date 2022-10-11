import React, { useState, useEffect, Fragment } from 'react';

const Radiobox = ({ CampPrices }) => {
  const [value, setValue] = useState(0);

  const handleChange = () => {
    // To be continued...
  };

  return CampPrices.map((price, index) => (
    <div key={index}>
      <input
        onChange={handleChange}
        value={`${price._id}`}
        type='radio'
        className='mr-2 ml-4'
      />
      <label className='form-check-label'>{price.name}</label>
    </div>
  ));
};

export default Radiobox;
