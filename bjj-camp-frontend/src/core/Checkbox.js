import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories }) => {
  const [checkbox, setCheckbox] = useState([]);

  const handleToggle = (category) => () => {
    // return the first index or -1
    const currentCategoryId = checkbox.indexOf(category);
    const newCheckboxCategoryId = [...checkbox];
    // if currently checkbox was not already in the checkbox state > push
    // else pull / take off

    if (currentCategoryId === -1) {
      newCheckboxCategoryId.push(category);
    } else {
      newCheckboxCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckboxCategoryId);
    setCheckbox(newCheckboxCategoryId);
  };

  return categories.map((category, index) => (
    <li key={index} className='list-unstyled'>
      <input
        onChange={handleToggle(category._id)}
        value={checkbox.indexOf(category._id === -1)}
        type='checkbox'
        className='form-check-input'
      />
      <label className='form-check-label'>{category.name}</label>
    </li>
  ));
};

export default Checkbox;
