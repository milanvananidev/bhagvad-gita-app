import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux';
import moment from 'moment';
import { COLORS, FONTS } from '../../theme/theme';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@react-navigation/native';

const HomeHeader = () => {

    const { t } = useTranslation();
    const theme = useTheme();


    const { Firstname, Lastname } = useSelector((state) => state.user);


    const getGreeting = () => {
        var currentHour = moment().hour();
        // Greeting based on the time of the day
        let greeting;
        if (currentHour >= 5 && currentHour < 12) {
            greeting = 'Good Morning';
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = 'Good Afternoon';
        } else if (currentHour >= 18 && currentHour < 24) {
            greeting = 'Good Evening';
        } else {
            greeting = 'Good Night';
        }

        return t(`home.${greeting}`);
    }

    return (
        <View style={{ marginTop: 25 }}>
            <Text style={{ ...FONTS.h4, color: theme.colors.text }}>
                {getGreeting()}
                {Firstname && (
                    <Text Text style={{ color: theme.dark ? COLORS.primary2 : COLORS.primary }}>{` ${Firstname} ${Lastname}`} </Text>
                ) || null}
            </Text>
        </View>
    )
}

export default HomeHeader