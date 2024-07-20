import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTS } from '../../theme/theme'
import { TabActions, useFocusEffect, useNavigation, useTheme } from '@react-navigation/native'
import TaskCard from './TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { removeYesterdayComplatedVerse } from '../../redux/actions/metaData'
import moment from 'moment'

const TodayTasks = () => {

    const { t } = useTranslation();
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const todayComplatedVerses = useSelector((state) => state.meta.todayComplatedVerses) || [];
    const verseDate = useSelector((state) => state?.meta?.dailyVerse?.date);
    const todayDate = moment().format('DD/MM/YYYY');

    const notificationTime = useSelector((state) => state.meta.notificationTime);

    const dailyTask = {
        id: 1,
        title: t("home.Read 5 verses"),
        action: () => {
            navigation.navigate('todayverse')
        },
        isComplated: todayComplatedVerses?.length >= 5,
        progress: todayComplatedVerses?.length / 5 * 100
    }

    const reminderTask = {
        id: 2,
        title: t("home.Set Daily Reminder"),
        action: () => {
            navigation.navigate('More')
        },
        isComplated: false,
        progress: 0
    }

    useEffect(() => {
        if (verseDate !== todayDate) {
            dispatch(removeYesterdayComplatedVerse(todayComplatedVerses))
        }
    }, []);

    return (
        <View style={styles.mainView}>
            <Text style={{ ...FONTS.h4, color: theme.colors.text }}>
                {t("home.Today")}
            </Text>

            <TaskCard
                text={dailyTask.title}
                onPress={() => { dailyTask?.action() }}
                isComplated={dailyTask?.isComplated}
                progress={dailyTask?.progress}
            />

            {
                !notificationTime && (
                    <TaskCard
                        text={reminderTask.title}
                        onPress={() => { reminderTask?.action() }}
                        isComplated={reminderTask?.isComplated}
                        progress={reminderTask?.progress}
                    />
                ) || null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        marginVertical: 30,

    }
})

export default TodayTasks