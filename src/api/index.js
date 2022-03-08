import axios from 'axios';
import queryString from 'querystring';

const makeUrl = (uri, params) => {
  if (params && Object.keys(params).length) {
    return `${uri}?${queryString.stringify(params)}`;
  }
  return uri;
};


const getAccessToken = () => {
  return "local storage token"
};

export {
  axios,
  makeUrl,
  getAccessToken
}
