import axios from 'axios';
import fetchToken from '../../api/fetchToken';

jest.mock('axios');

describe('fetchToken', () => {
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

    const result = await fetchToken(mockToken, mockId);

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

    await fetchToken(mockToken, mockId);
  });
});
