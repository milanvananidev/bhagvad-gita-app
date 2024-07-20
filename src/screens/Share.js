import {View} from 'react-native';
import React from 'react';
import Header from '../layout/Header';
import ShareCard from '../components/share/ShareCard';
import {useRoute} from '@react-navigation/native';

const Share = () => {
  const route = useRoute();
  const {params} = route;
  const {verse, chapter, verseTxt} = params;

  return (
    <View>
      <Header title={'Share'} leftIcon={'back'} />
      <ShareCard verse={verse} chapter={chapter} verseTxt={verseTxt} />
    </View>
  );
};

export default Share;
