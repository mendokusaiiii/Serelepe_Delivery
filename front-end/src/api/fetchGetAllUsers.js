import axios from 'axios';

async function fetchGetAllUsers() {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.get('/admin', {
      // headers: { Authorization: token },
    });
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchGetAllUsers;
