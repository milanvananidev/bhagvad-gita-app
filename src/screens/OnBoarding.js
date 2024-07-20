import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Welcome from '../components/onBoarding/WelCome'
import UserInfo from '../components/onBoarding/UserInfo';
import DailyReminder from '../components/onBoarding/DailyReminder';
import MUIIcon from 'react-native-vector-icons/MaterialIcons'
import { COLORS } from '../theme/theme';
import { useTheme } from '@react-navigation/native';

const OnBoarding = () => {

    const theme = useTheme();
    const [index, setIndex] = useState(0);

    return (
        <View style={styles.mainView}>
            <TouchableOpacity activeOpacity={1} onPress={() => { setIndex((index) => index - 1) }} style={styles.backIconView}>
                <MUIIcon name={'arrow-back'} size={20} color={theme.colors.text} />
            </TouchableOpacity>
            {index === 0 ? <Welcome setIndex={setIndex} /> : null}
            {index === 1 ? <UserInfo setIndex={setIndex} /> : null}
            {index === 2 ? <DailyReminder setIndex={setIndex} /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    backIconView: {
        height: 50,
        width: 50,
        borderWidth: 2,
        borderColor: COLORS.darkCard,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 25,
        top: 20
    }
})

export default OnBoarding