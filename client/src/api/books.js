import axios from 'axios';

export const getBooks = async () => {
  const response = await axios({
    method: 'GET',
    url: 'http://127.0.0.1:20001/api/get-books',
    headers: {
      sessionid: sessionStorage.getItem('sessionid'),
    },
  });
  return response.data.books;
};

export const updateIsCompleted = async (params) => {
  await axios({
    method: 'POST',
    url: 'http://127.0.0.1:20001/api/update-is-completed',
    data: params,
    headers: {
      sessionid: sessionStorage.getItem('sessionid'),
    }
  });
};
