import axios from 'axios';

async function fetchCreatingUser(obj) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
  });
  try {
    const result = await instance.post(
      '/users',
      obj,
    );
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchCreatingUser;
