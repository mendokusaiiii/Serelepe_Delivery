import axios from 'axios';

async function fetchProduct() {
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
  });
  try {
    const result = await instance.get('/products');
    return result;
  } catch (error) {
    return error.response;
  }
}

export default fetchProduct;
