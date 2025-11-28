import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL = 'https://api.thecatapi.com/v1';

export const catApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': Config.API_KEY,
  },
});

export const fetchBreeds = async () => {
  try {
    const response = await catApi.get('/breeds');
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Error fetching breeds from API');
  }
};
