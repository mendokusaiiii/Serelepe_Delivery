import axios from 'axios';
import fetchGetAllUsers from '../../api/fetchGetAllUsers';

jest.mock('axios');

describe('fetchGetAllUsers', () => {
  test('Sucess Response', async () => {
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

    const result = await fetchGetAllUsers(mockToken, mockId);

    expect(axios.create).toHaveBeenCalled();
    expect(result).toEqual(mockResponseData);
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

    const result = await fetchGetAllUsers(mockToken, mockId);

    expect(result).toEqual(mockErrorResponse.response);
  });
});
