import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_MESSAGING_API_URL,
  responseType: 'json',
  timeout: 300000, // 3 minutes
});
