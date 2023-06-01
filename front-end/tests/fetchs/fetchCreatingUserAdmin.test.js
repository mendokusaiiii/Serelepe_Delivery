import axios from 'axios';
import fetchCreatingUserAdmin from '../../api/fetchCreatingUserAdmin';

jest.mock('axios');

describe('fetchCreatingUserAdmin', () => {
  it('succes response', async () => {
    const token = 'example_token';
    const obj = { name: 'John Test', email: 'teste1@teste.com' };
    const responseData = { id: 1, name: 'John Test', email: 'teste1@teste.com' };
    const mockPost = jest.fn().mockResolvedValueOnce({ data: responseData });
    axios.create.mockReturnValueOnce({
      post: mockPost,
    });

    await fetchCreatingUserAdmin(token, obj);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:3001',
    });
    expect(mockPost).toHaveBeenCalledWith('/admin', obj, {
      headers: { Authorization: token },
    });
  });

  it('error response', async () => {
    const token = 'example_token';
    const obj = { name: 'John Test', email: 'teste@teste.com' };
    const errorResponse = { status: 500, message: 'Internal Server Error' };
    const mockPost = jest.fn().mockRejectedValueOnce({ response: errorResponse });
    axios.create.mockReturnValueOnce({
      post: mockPost,
    });

    const result = await fetchCreatingUserAdmin(token, obj);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'http://localhost:3001',
    });
    expect(mockPost).toHaveBeenCalledWith('/admin', obj, {
      headers: { Authorization: token },
    });
    expect(result).toEqual(errorResponse);
  });
});
