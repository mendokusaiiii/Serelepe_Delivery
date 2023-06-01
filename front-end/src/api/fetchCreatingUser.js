import axios from 'axios';

async function fetchCreatingUser(obj) {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.post(
      '/users',
      obj,
    );
    console.log(result);
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchCreatingUser;
