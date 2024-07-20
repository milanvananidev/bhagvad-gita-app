import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS } from '../../theme/theme'
import { useTranslation } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setToStorage } from '../../utils/localStorage'
import { useDispatch } from 'react-redux'
import { changeUserLanguage } from '../../redux/actions/user'
import { useTheme } from '@react-navigation/native'

const LanguageSelector = ({ selected, setSelected }) => {

    const theme = useTheme();
    const { i18n } = useTranslation();
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    setToStorage('language', 'en')
                    i18n.changeLanguage('en')
                    setSelected('en');
                    dispatch(changeUserLanguage('en'))
                }}
                activeOpacity={0.8}
                style={[styles.btn, { borderColor: selected === 'en' ? COLORS.primary2 : COLORS.darkCard }]}
            >
                <Text style={[styles.lang, { color: theme.colors.text }]}>{'English'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={async () => {
                    setToStorage('language', 'hi')
                    i18n.changeLanguage('hi')
                    setSelected('hi')
                    dispatch(changeUserLanguage('hi'))
                }}
                activeOpacity={0.8} style={[styles.btn, { borderColor: selected === 'hi' ? COLORS.primary2 : COLORS.darkCard }]}
            >
                <Text style={[styles.lang, { color: theme.colors.text }]}>{'Hindi'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 30,
    },
    btn: {
        backgroundColor: COLORS.darkCard,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.darkCard,
        elevation: 1
    },
    lang: {
        ...FONTS.fontPoppins,
        fontSize: 15
    }
})

export default LanguageSelector