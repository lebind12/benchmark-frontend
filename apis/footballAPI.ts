import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_FOOTBALLAPIURL;

export const footballAPI = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'x-rapidapi-key': process.env.NEXT_PUBLIC_FOOTBALLAPIKEY,
    'x-rapidapi-host': process.env.NEXT_PUBLIC_FOOTBALLAPIHOST,
  },
});
