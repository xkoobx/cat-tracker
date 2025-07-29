import axios from 'axios';

const BASE_URL = '/api/cats';

export const getCats = (date, feedingTime) => axios.get(`${BASE_URL}/${date}/${feedingTime}`).then(res => res.data);
export const createCat = cat => axios.post(BASE_URL, cat).then(res => res.data);
export const deleteCat = id => axios.delete(`${BASE_URL}/${id}`);
export const updateFeeding = (id, date, feedingTime, fed) =>
  axios.put(`${BASE_URL}/${id}/${date}/${feedingTime}/feed`, null, { params: { fed } });
export const resetFeeding = (date, feedingTime) => axios.post(`${BASE_URL}/${date}/${feedingTime}/reset`)
