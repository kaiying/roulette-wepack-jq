import axios from 'axios';

const API_PATH = `${process.env.EC_API_URL}${process.env.API_URL_ROULETTE}`;

export const fetchRewards = (token, activity) =>
  axios({
    method: 'get',
    headers: { Authorization: token },
    url: `${API_PATH}/${activity}`,
  });

export const enter = (token, data) =>
  axios({
    method: 'post',
    headers: { Authorization: token },
    url: API_PATH,
    data,
  });

export default {
  fetchRewards,
  enter,
};
