import axios from 'axios';

const baseURL = 'https://v3.football.api-sports.io/';

export const footballAPI = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'x-rapidapi-key': 'f5ba335c4cd05b02fe886009f1d81d73',
    'x-rapidapi-host': 'v3.football.api-sports.io',
  },
});
