import axios from 'axios';

const baseURL = 'https://api-benchmark.vercel.app';

export const benchmarkAPI = axios.create({ baseURL: baseURL, timeout: 10000 });
