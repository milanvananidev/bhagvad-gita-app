import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Share from 'react-native-share';
import Images from '../../constants/Images'
import { useTheme } from '@react-navigation/native'
import { COLORS, FONTS } from '../../theme/theme'
import MUIIcon from 'react-native-vector-icons/MaterialIcons'
import { getTodayQuote } from '../../utils/utils'
import { useTranslation } from 'react-i18next';

const TodayQuote = () => {

    const { i18n } = useTranslation();
    const theme = useTheme();

    const [todayQuote, setTodayQuote] = useState('');

    useEffect(() => {
        getTodayQuote({ lang: i18n.language }).then((res) => {
            setTodayQuote(res)
        })
    }, [i18n.language]);

    const handleShare = () => {
        Share.open({
            message: todayQuote
        })
    }

    return (
        <View>
            <View style={[styles.quoteView, { backgroundColor: theme.colors.card }]}>
                <Image source={Images.QuoteImage} style={[styles.quoteImage, { tintColor: theme.dark ? '#fff' : COLORS.primary }]} />
                <Text style={[styles.quoteText, { color: theme.colors.text }]}>{todayQuote}</Text>
                <TouchableOpacity onPress={handleShare} style={[styles.shareView, { borderColor: theme.colors.text }]}><MUIIcon name={'share'} size={25} color={theme.colors.text} style={{ left: -1 }} /></TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    quoteView: {
        paddingTop: 30,
        paddingBottom: 25,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    quoteImage: {
        height: 50,
        aspectRatio: 1.5 / 1,
        marginTop: -38,
        left: -12
    },
    quoteText: {
        ...FONTS.fontNunito,
        fontSize: 15,
        lineHeight: 25,
        marginVertical: 15,
    },
    shareView: {
        padding: 10,
        alignSelf: 'flex-end',
        borderRadius: 50,
        borderWidth: 1,
        marginTop: 10,
        right: 20
    }
})

export default TodayQuote