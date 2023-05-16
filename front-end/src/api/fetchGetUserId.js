import axios from 'axios';

async function fetchGetUserId(obj) {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.post('/user', obj);
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchGetUserId;
