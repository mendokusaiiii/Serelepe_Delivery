import axios from 'axios';
import fetchGetUserId from '../../api/fetchGetUserId';

jest.mock('axios');

describe('fetchGetUserId', () => {
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

    const result = await fetchGetUserId(mockToken, mockId);

    expect(axios.create).toHaveBeenCalled();
    expect(result).toEqual(undefined);
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

    const result = await fetchGetUserId(mockToken, mockId);

    expect(result).toEqual(undefined);
  });
});
