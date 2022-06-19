import axios from 'axios';

export const authenticate = async (password) => {
  const response = await axios({
    method: 'POST',
    url: 'http://127.0.0.1:20001/api/authenticate',
    data: {
      password: password,
    },
    headers: {
      sessionid: sessionStorage.getItem('sessionid') ?? '',
    }
  });
  
  if (response.headers.sessionid) {
    sessionStorage.setItem('sessionid', response.headers.sessionid);
    return response.data.user;
  } else {
    return null;
  }
};
