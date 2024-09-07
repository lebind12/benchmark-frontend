import axios from 'axios';

const baseURL = 'https://v3.football.api-sports.io/';

export const footballAPI = axios.create({ baseURL: baseURL, timeout: 10000 });
