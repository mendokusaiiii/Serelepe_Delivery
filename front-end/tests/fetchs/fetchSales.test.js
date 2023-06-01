import axios from 'axios';
import fetchSales from '../../api/fetchSales';

jest.mock('axios');

describe('fetchSales', () => {
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

    const result = await fetchSales(mockToken, mockId);

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

    const result = await fetchSales(mockToken, mockId);

    expect(result).toEqual(undefined);
  });
});
