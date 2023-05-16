import axios from 'axios';

async function fetchSalesUpdatingStatus(token, id, obj) {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.put(`/sale/${id}`, obj, {
      headers: { Authorization: token },
    });
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchSalesUpdatingStatus;
