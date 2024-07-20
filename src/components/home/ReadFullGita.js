import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FONTS } from '../../theme/theme'
import { useNavigation, useTheme } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const ReadFullGita = () => {

    const { t } = useTranslation();
    const theme = useTheme();
    const navigation = useNavigation();

    const handleReadFullGita = () => {
        navigation.navigate('fullgita')
    }

    return (
        <TouchableOpacity onPress={handleReadFullGita} activeOpacity={0.8} style={[styles.mainView, { backgroundColor: theme.colors.primary }]}>
            <Text style={[styles.text, { color: theme.colors.background }]}>{t("home.Read Full Bhagvad Geeta")}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    text: {
        ...FONTS.fontPoppins,
        paddingVertical: 20
    }
})

export default ReadFullGita