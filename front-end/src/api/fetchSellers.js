import axios from 'axios';

async function fetchSellers() {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.get('/sellers');
    return result.data;
  } catch (error) {
    return error.response;
  }
}

export default fetchSellers;
