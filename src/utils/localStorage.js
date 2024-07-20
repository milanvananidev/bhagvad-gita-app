import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFromStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.error(`Error in getting ${key} from localStorage`);
  }
};

export const setToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error in setting ${key} in localStorage`);
  }
};
