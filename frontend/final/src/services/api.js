import axios from 'axios';

const rscApi = axios.create({
  baseURL: 'http://localhost' + ':8888/pet',
  // headers: {
  //   'doggie_token': sessionStorage.getItem('doggie_token') // header의 속성
  // }
});

// Add a request interceptor
rscApi.interceptors.request.use(
  function(config) {
    var token = sessionStorage.getItem('doggieToken');
    if (token !== null) {
      config['headers'] = {
        'doggieToken': token,
      };
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);



export { rscApi };
