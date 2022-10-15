import React, { useState, useEffect } from 'react';
import { getCategories, list } from './apiCore';
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

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} camps`;
    }
    if (searched && results.length < 1) {
      return 'No camps found';
    }
  };

  const searchedCamps = (results = []) => {
    return (
      <div>
        <h2 className='mt-4 mb-4'>{searchMessage(searched, results)}</h2>
        <div className='row'>
          {results.map((camp, index) => (
            <CampCard key={index} camp={camp} />
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className='input-group-text'>
          <div className='input-group input-group-lg'>
            <div className='input-group-prepend'>
              <select className='btn mr-2' onChange={handleChange('category')}>
                <option value='All'>All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <input
              type='search'
              className='form-control'
              onChange={handleChange('search')}
              placeholder='Search'
            />
          </div>
          <div className='btn input-group-append' style={{ border: 'none' }}>
            <button className='input-group-text'>Search Camp</button>
          </div>
        </span>
      </form>
    );
  };

  return (
    <div className='row'>
      <div className='container mb-3'>{searchForm()}</div>
      <div className='container-fluid mb-3'>{searchedCamps(results)}</div>
    </div>
  );
};

export default SearchCamp;
