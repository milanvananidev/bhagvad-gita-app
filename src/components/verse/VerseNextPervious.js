import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const VerseNextPervious = ({onNextVerse, onPreviousVerse}) => {
  const theme = useTheme();

  return (
    <View style={styles.mainView}>
      <TouchableOpacity onPress={onPreviousVerse} style={[styles.iconBox, {backgroundColor: theme.colors.card}]}>
        <Icon name={'navigate-before'} color={theme.colors.text} size={25} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNextVerse} style={[styles.iconBox, {backgroundColor: theme.colors.card}]}>
        <Icon name={'navigate-next'} color={theme.colors.text} size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 25,
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconBox: {
    padding: 15,
    borderRadius: 100,
    elevation: 2,
  },
});

export default VerseNextPervious;
