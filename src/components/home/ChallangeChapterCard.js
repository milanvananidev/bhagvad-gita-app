import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { FONTS } from '../../theme/theme'
import { getChapters } from '../../requests/request'
import MUI from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'

const ChallangeChapterCard = ({ chapter }) => {

    const { i18n } = useTranslation();
    const theme = useTheme();
    const navigation = useNavigation();
    const oneChapter = getChapters()[chapter - 1];

    const language = i18n.language;
    const isHindi = language === 'hi';

    const navigateChapter = () => {
        navigation.navigate('chapter', {
            number: chapter,
            name: isHindi ? oneChapter.name : oneChapter.name_translated,
            summary: isHindi ? oneChapter.chapter_summary_hindi : oneChapter.chapter_summary,
            verses: 0,
        });
    }

    return (
        <TouchableOpacity style={[styles.mainView, { backgroundColor: theme.colors.card }]} onPress={navigateChapter} activeOpacity={0.8}>
            <View style={[styles.chapterNumber, { backgroundColor: theme.colors.text }]}>
                <Text style={[styles.text, { color: theme.colors.card }]}>{chapter}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[styles.chapterTitle, { color: theme.colors.text }]}>{language === 'hi' ? oneChapter?.name : oneChapter?.name_translated}</Text>
            </View>

            <MUI name={'chevron-right'} color={theme.colors.text} size={30} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        paddingVertical: 15,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
        elevation: 2
    },
    chapterTitle: {
        ...FONTS.fontPoppins,
        fontSize: 15,
    },
    chapterNumber: {
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        ...FONTS.fontPoppins,
        fontSize: 15
    }
})

export default ChallangeChapterCard