import { API } from '../config';

export const getCamps = (sortBy) => {
  return fetch(`${API}/camps?sortBy=${sortBy}&order=desc&limit=6`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export default getCamps;
