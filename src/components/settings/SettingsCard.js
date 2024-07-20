import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FONTS } from '../../theme/theme';
import { useTheme } from '@react-navigation/native';

const SettingsCard = ({ title, onPress, icon, value, showRedDot }) => {
  const theme = useTheme();

  return (
    <>
      <TouchableOpacity
        style={[styles.settingCard, { borderBottomColor: theme.colors.card, backgroundColor: theme.colors.card }]}
        onPress={onPress}
        activeOpacity={0.6} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.iconBox, { backgroundColor: theme.colors.text }]}>
            <FontAwesomeIcon name={icon} size={20} color={theme.colors.background} />
          </View>
          <Text style={[styles.settingText, { color: theme.colors.text }]}>{title}</Text>
        </View>
        <View style={{ flexDirection: 'row', userSelect: 'center', alignItems: 'center', gap: 5 }}>
          {showRedDot ? <View style={{ height: 10, width: 10, backgroundColor: 'red', borderRadius: 5 }} /> : null}
          <Text style={{ color: theme.colors.text }}>{value}</Text>
          <FontAwesomeIcon name={'chevron-right'} color={theme.colors.text} size={25} />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  settingCard: {
    paddingVertical: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingRight: 15,
    paddingLeft: 10,
    elevation: 2,
  },
  iconBox: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    ...FONTS.fontPoppins,
    ...FONTS.h6,
  },
});

export default SettingsCard;
