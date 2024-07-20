import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {COLORS, FONTS} from '../../theme/theme';

const ChpaterRound = ({number, chapter, filled}) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const handleNavigateToVerse = () => {
    navigation.navigate('verse', {verse: number, chapter});
  };

  return (
    <TouchableOpacity
      style={[styles.box, {
        borderColor: theme.dark ? theme.colors.card : '#333',
        backgroundColor: filled ? theme.dark ? theme.colors.card : COLORS.primary : 'transparent'}]}
      onPress={handleNavigateToVerse}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, {color: theme.dark ? '#fff' : filled ? '#fff' : '#000'}]}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  text: {
    ...FONTS.fontPoppins,
    fontSize: 16,
  },
});

export default ChpaterRound;
