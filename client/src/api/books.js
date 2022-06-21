import axios from 'axios';

export const getBooks = async () => {
  const response = await axios({
    method: 'GET',
    url: `${process.env.BASE_URL}api/get-books`,
    headers: {
      sessionid: sessionStorage.getItem('sessionid'),
    },
  });
  return response.data.books;
};

export const updateIsCompleted = async (params) => {
  await axios({
    method: 'POST',
    url: `${process.env.BASE_URL}api/update-is-completed`,
    data: params,
    headers: {
      sessionid: sessionStorage.getItem('sessionid'),
    }
  });
};
