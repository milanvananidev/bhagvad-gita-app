import {View} from 'react-native';
import React from 'react';
import ChpaterRound from './ChpaterRound';

const ChapterVerse = ({verses, chapter, addedChapterVerses}) => {
  const keys = addedChapterVerses?.map((data) => data.verse) || [];

  const dots = Array(verses).fill().map((_, index) => (
    <ChpaterRound number={index + 1} filled={keys.includes(index + 1)} key={index} chapter={chapter} />
  ));

  return (
    <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap', gap: 5, marginTop: 20}}>
      {dots}
    </View>
  );
};

export default ChapterVerse;
