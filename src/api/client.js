import axios from 'axios';

export default axios.create({
  baseURL: 'https://newsapplication-yoft.onrender.com/api',
  //baseURL: 'http://10.0.2.2:3000/api',
});
