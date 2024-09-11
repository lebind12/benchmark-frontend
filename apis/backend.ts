import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BENCHMARKURL;

export const benchmarkAPI = axios.create({ baseURL: baseURL, timeout: 10000 });
