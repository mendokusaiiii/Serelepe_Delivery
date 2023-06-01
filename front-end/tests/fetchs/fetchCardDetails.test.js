import axios from 'axios';
import fetchCardDetail from '../../api/fetchCardDetail';

jest.mock('axios');

describe('fetchCardDetail', () => {
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

    const result = await fetchCardDetail(mockToken, mockId);

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

    const result = await fetchCardDetail(mockToken, mockId);

    expect(result).toEqual(mockErrorResponse.response);
  });
});
