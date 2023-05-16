import axios from 'axios';

async function fetchSalesByRoleId(token, obj) {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.post('/sale/byroleid', obj, {
      headers: { Authorization: token },
    });
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchSalesByRoleId;
