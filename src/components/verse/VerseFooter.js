import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../theme/theme';

const VerseFooter = () => {
  const width = Dimensions.get('window').width;

  return (
    <View style={styles.mainView}>
      <View style={{backgroundColor: COLORS.primary2, width, height: 50}} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'rgba(255,255,255,0.3)',
    borderTopWidth: 1,
    zIndex: 999,
  },
});

export default VerseFooter;
