import axios from 'axios';

async function fetchLogin(obj) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
  });
  try {
    const result = await instance.post('/login', obj);
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchLogin;
