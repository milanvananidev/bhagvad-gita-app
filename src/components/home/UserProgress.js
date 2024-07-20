import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { FONTS } from '../../theme/theme'
import TaskCard from './TaskCard';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const UserProgress = () => {

    const { t } = useTranslation();
    const theme = useTheme();

    const rededverses = useSelector((state) => state.meta.rededverses);
    const progress = rededverses?.length / 700 * 100;

    return (
        <View style={styles.mainView}>
            <Text style={{ ...FONTS.h4, color: theme.colors.text }}>
                {t("home.Progress")}
            </Text>
            <TaskCard text={t("home.Read out of", { verses: rededverses?.length })} progress={progress} hideArrow={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        marginBottom: 30
    },
})

export default UserProgress