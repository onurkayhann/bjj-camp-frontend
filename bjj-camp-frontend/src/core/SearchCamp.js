import React, { useState, useEffect } from 'react';
import { getCategories } from './apiCore';
import CampCard from './CampCard';

const SearchCamp = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <h2>Search Camp {JSON.stringify(categories)}</h2>
    </div>
  );
};

export default SearchCamp;
