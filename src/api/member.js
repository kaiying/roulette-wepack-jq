import axios from 'axios';

const API_PATH = `${process.env.EC_API_URL}${process.env.API_URL_MEMBER}`;

export default (token) =>
  axios({
    method: 'get',
    headers: { Authorization: token },
    url: API_PATH,
  });
