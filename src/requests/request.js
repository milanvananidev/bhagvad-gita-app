import axios from 'axios';
import chapters from '../database/chapters';
import { handleAPIData } from '../helper/handleData';

export const getChapters = () => {
  try {
    return chapters;
  } catch (error) {
    console.log('error to load chapters');
  }
};

// You can get your API keys from here for free - https://rapidapi.com/bhagavad-gita-bhagavad-gita-default/api/bhagavad-gita3/playground/apiendpoint_01f756ff-a6ee-421e-bf25-1882974c4857
export const getVerse = async ({ chapter, verse }) => {
  const options = {
    method: 'GET',
    url: `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapter}/verses/${verse}/`,
    headers: {
      'X-RapidAPI-Key': 'your-api-leu',
      'X-RapidAPI-Host': 'bhagavad-gita3.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const data = await handleAPIData(response?.data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

