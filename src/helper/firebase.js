import storage from '@react-native-firebase/storage';

export const getAudioURL = async (chapter, verse) => {
  const url = await storage().ref(`${chapter}/${verse}.mp3`).getDownloadURL();
  return url;
};
