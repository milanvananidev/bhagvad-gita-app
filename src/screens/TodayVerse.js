import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { FONTS } from '../theme/theme'
import { useDispatch, useSelector } from 'react-redux'
import TaskCard from '../components/home/TaskCard'
import { removeYesterdayComplatedVerse, setTodayChallange, setTodayReadVerse } from '../redux/actions/metaData'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { checkForNextVerse } from '../utils/utils'
import { useTranslation } from 'react-i18next'
import Header from '../layout/Header'
import ChallangeChapterCard from '../components/home/ChallangeChapterCard'

const TodayVerse = () => {

    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const todayVeres = useSelector((state) => state?.meta?.dailyVerse?.verses) || [];
    const verseDate = useSelector((state) => state?.meta?.dailyVerse?.date);
    const todayComplatedVerses = useSelector((state) => state.meta.todayComplatedVerses) || [];
    const yesterdayComplatedVerses = useSelector((state) => state.meta.yesterdayComplatedVerses) || [];

    const lastRead = yesterdayComplatedVerses[yesterdayComplatedVerses?.length - 1] || { chapter: 1, verse: 0 };
    const todayDate = moment().format('DD/MM/YYYY');

    const setTodayVerses = () => {
        // Remove yesterday complated verses object
        if (todayComplatedVerses?.length > 0) {
            dispatch(removeYesterdayComplatedVerse(todayComplatedVerses));
        }

        let tempVerses = [];

        const { chapter, verse } = lastRead;

        if (chapter > 18) {
            AsyncStorage.setItem('gitacomplated', 'true');

            return dispatch(setTodayChallange({
                date: todayDate,
                verses: [],
            }))
        }

        const finalVerse = verse + 1;
        let nextChapterVerse = 0;

        for (i = finalVerse; i < finalVerse + 5; i++) {
            if (checkForNextVerse(chapter, i - 1)) {
                tempVerses.push({ chapter, verse: i, type: 'verse' })
            } else {
                // If maxium verse reached, then start new chapter.
                let nextChapter = chapter + 1;
                nextChapterVerse += 1

                // Only push chapter card, when verse is 1
                if (nextChapterVerse === 1) {
                    tempVerses.push({ chapter: nextChapter, type: 'chapter' });
                }

                tempVerses.push({ chapter: nextChapter, verse: nextChapterVerse, type: 'verse' });
            }
        }

        dispatch(setTodayChallange({
            date: todayDate,
            verses: tempVerses
        }))
    }

    const checkIsComplated = (obj) => {
        const { verse, chapter } = obj;
        let filterObj = todayComplatedVerses?.filter((data) => data?.verse === verse && data?.chapter === chapter);
        return filterObj.length > 0;
    }

    useEffect(() => {
        if (verseDate !== todayDate) { setTodayVerses() }
    }, []);

    return (
        <>
            <View style={{ marginTop: 20 }} />
            <Header title={t('home.Today')} leftIcon={'back'} />
            <View style={styles.mainView}>
                {
                    todayVeres?.map((item, index) => {
                        if (item.type === 'verse') {
                            return <TaskCard
                                isComplated={checkIsComplated(item)}
                                key={index}
                                text={`${t("home.Chapter", { chapter: item.chapter })} -${t("home.Verse", { verse: item.verse })}`}
                                onPress={() => { navigation.navigate("verse", { chapter: item.chapter, verse: item.verse, isFromToday: true }) }}
                            />
                        } else {
                            // Render new chapter Card
                            return <ChallangeChapterCard chapter={item.chapter} />
                        }
                    })
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginHorizontal: 25,
    },
    title: {
        ...FONTS.fontBold,
        fontSize: 25,
        marginVertical: 15
    }
})

export default TodayVerse