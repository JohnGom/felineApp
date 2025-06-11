import axios from 'axios';

const API_KEY = 'live_99Qe4Ppj34NdplyLW67xCV7Ds0oSLKGgcWWYnSzMJY9C0QOu0HUR4azYxWkyW2nr';
const BASE_URL = 'https://api.thecatapi.com/v1';

export const catApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'x-api-key': API_KEY,
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
