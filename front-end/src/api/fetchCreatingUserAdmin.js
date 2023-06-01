import axios from 'axios';

async function fetchCreatingUser(token, obj) {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.post(
      '/admin',
      obj,
      { headers: { Authorization: token } },
    );
    console.log(result);
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchCreatingUser;
