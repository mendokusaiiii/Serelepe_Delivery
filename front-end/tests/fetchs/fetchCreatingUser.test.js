import axios from 'axios';
import fetchCreatingUser from '../../api/fetchCreatingUser';

jest.mock('axios');

describe('fetchCreatingUser', () => {
  it('Sucess Response', async () => {
    const obj = { name: 'John Test', email: 'teste1@teste.com' };
    const responseData = { id: 1, name: 'John Test', email: 'teste1@teste.com' };
    const mockPost = jest.fn().mockResolvedValueOnce({ data: responseData });
    axios.create.mockReturnValueOnce({
      post: mockPost,
    });

    await fetchCreatingUser(obj);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:3001',
    });
    expect(mockPost).toHaveBeenCalledWith('/users', obj);
  });

  it('Error Response', async () => {
    const obj = { name: 'John Test', email: 'teste@teste.com' };
    const errorResponse = { status: 500, message: 'Internal Server Error' };
    const mockPost = jest.fn().mockRejectedValueOnce({ response: errorResponse });
    axios.create.mockReturnValueOnce({
      post: mockPost,
    });

    const result = await fetchCreatingUser(obj);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:3001',
    });
    expect(mockPost).toHaveBeenCalledWith('/users', obj);
    expect(result).toEqual(errorResponse);
  });
});
