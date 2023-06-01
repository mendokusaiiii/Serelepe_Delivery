import axios from 'axios';
import fetchDeleteUser from '../../api/fetchDeleteUser';

jest.mock('axios');

describe('fetchDeleteUser', () => {
  test('Success Response', async () => {
    const mockToken = 'dummy-token';
    const mockId = '123';

    const mockResponseData = {
      data: [
        { empty: 'data' },
      ],
    };

    axios.create.mockReturnValueOnce({
      get: jest.fn().mockResolvedValueOnce(mockResponseData),
    });

    await fetchDeleteUser(mockToken, mockId).catch((error) => {
      console.error(error);
    });

    expect(axios.create).toHaveBeenCalled();
  });

  test('Error response', async () => {
    const mockToken = 'dummy-token';
    const mockId = '123';

    const mockErrorResponse = {
      response: {
        status: 404,
        data: 'Not found',
      },
    };

    axios.create.mockReturnValueOnce({
      get: jest.fn().mockRejectedValueOnce(mockErrorResponse),
    });

    await fetchDeleteUser(mockToken, mockId).catch((error) => {
      console.error(error);
    });
  });
});
