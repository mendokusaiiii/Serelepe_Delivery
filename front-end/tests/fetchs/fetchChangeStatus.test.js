import axios from 'axios';
import fetchChangeStatus from '../../api/fetchChangeStatus';

jest.mock('axios');

describe('fetchChangeStatus', () => {
  test('Sucess Response', async () => {
    const mockToken = 'dummy-token';
    const mockId = '123';

    const mockResponseData = {
      data: {
        message: 'Status changed ',
      },
    };

    axios.create.mockReturnValueOnce({
      put: jest.fn().mockResolvedValueOnce(mockResponseData),
    });

    const result = await fetchChangeStatus(mockToken, mockId);

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
      put: jest.fn().mockRejectedValueOnce(mockErrorResponse),
    });

    const result = await fetchChangeStatus(mockToken, mockId);

    expect(result).toEqual(mockErrorResponse.response);
  });
});
