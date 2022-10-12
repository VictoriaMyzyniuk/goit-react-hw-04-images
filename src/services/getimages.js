import axios from 'axios';

export const getImages = async (query, page) => {
  const BASE_URL = 'https://pixabay.com/api/';

  const KEY = '29542171-d27caeadb94251ff2cc88b8a0';

  const response = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};
