import {getFromStorage} from '../utils/localStorage';

export const handleAPIData = async (data) => {
  const translator = await getFromStorage('Translation') || 'Shri Purohit Swami';
  const commentator = await getFromStorage('Commentary') || 'Swami Sivananda';

  const filterTranslator = data?.translations?.filter((trans) => trans?.author_name === translator);
  const filterComentrators = data?.commentaries?.filter((comentry) => comentry?.author_name === commentator);

  const updatedData = {
    ...data,
    commentaries: filterComentrators,
    translations: filterTranslator,
  };

  return updatedData;
};
