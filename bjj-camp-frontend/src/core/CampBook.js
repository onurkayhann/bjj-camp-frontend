import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import CampCard from './CampCard';
import { getCategories, getFilteredCamps } from './apiCore';
import Checkbox from './Checkbox';
import Radiobox from './Radiobox';
import { CampPrices } from './CampPrices';

const CampBook = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [filteredResults, setFilteredResults] = useState(0);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredCamps = (newFilters) => {
    // console.log(newFilters);
    getFilteredCamps(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data);
      }
    });
  };

  useEffect(() => {
    init();
    loadFilteredCamps(skip, limit, myFilters.filters);
  }, []);

  // Filter from category and price
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy == 'price') {
      let pricesCamp = handlePrice(filters);
      newFilters.filters[filterBy] = pricesCamp;
    }
    loadFilteredCamps(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = CampPrices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <Layout
      title='Booking page'
      description='Find and book your Camp'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-4'>
          <ul>
            <h4>Filter by degree</h4>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            />
          </ul>

          <h4>Filter by price range</h4>
          <div>
            <Radiobox
              CampPrices={CampPrices}
              handleFilters={(filters) => handleFilters(filters, 'price')}
            />
          </div>
        </div>
        <div className='col-8'>{JSON.stringify(filteredResults)}</div>
      </div>
    </Layout>
  );
};

export default CampBook;
