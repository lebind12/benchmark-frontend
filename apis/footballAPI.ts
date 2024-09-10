import axios from 'axios';

const baseURL = 'https://v3.football.api-sports.io/';

export const footballAPI = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'x-rapidapi-key': 'ae8a0daf8b42d12818ccbdec67ca30f5',
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
});
