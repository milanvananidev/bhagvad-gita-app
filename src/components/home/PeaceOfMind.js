import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import { FONTS } from '../../theme/theme'
import { useTheme } from '@react-navigation/native'
import ScrollViewCard from './ScrollViewCard'
import peaceofmind from '../../database/peaceofmind'
import { useTranslation } from 'react-i18next'

const PeaceOfMind = () => {

    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const data = []

    Object.keys(peaceofmind)?.map((key) => {
        let item = peaceofmind[key];
        data.push(item);
    });

    return (
        <View>
            <Text style={{ ...FONTS.h4, color: theme.colors.text }}>{t("home.Peace of mind")}</Text>
            <FlatList
                data={data}
                style={{ marginTop: 20 }}
                renderItem={({ item, index }) => {
                    return <ScrollViewCard key={index} item={item} />
                }}
                numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {

    }
})

export default PeaceOfMind