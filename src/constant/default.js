// export const API_ENDPOINT_URL = 'http://localhost:8000'
let API_ENDPOINT_URL;
if (window.location.origin == 'staging') {
  API_ENDPOINT_URL = 'staging api';
} else {
  API_ENDPOINT_URL = 'live api';
}
export { API_ENDPOINT_URL };
