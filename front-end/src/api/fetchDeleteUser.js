import axios from 'axios';

async function fetchDeleteUser(token, id) {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.delete(`/admin/${id}`, {
      headers: { Authorization: token },
    });
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchDeleteUser;
