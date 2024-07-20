import React, { useState } from 'react'
import { View, Text, StyleSheet, PermissionsAndroid, NativeModules, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import IntentLauncher from 'react-native-intent-launcher'
import { COLORS } from '../../theme/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Title from '../common/Title'
import Description from '../common/Description';
import SettingsCard from '../settings/SettingsCard';
import PushNotification from 'react-native-push-notification';
import { setNotificationTime } from '../../redux/actions/metaData';
import moment from 'moment';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import CustomButton from './CustomButton';

const DailyReminder = ({ setIndex }) => {

    const dispatch = useDispatch();
    const theme = useTheme();
    const navigation = useNavigation();
    const { t } = useTranslation();

    const { PermissionManager } = NativeModules;

    const [showPicker, setShowPicker] = useState(false);

    const notificationTime = useSelector((state) => state.meta.notificationTime);
    const formatedTime = moment(notificationTime).format('hh:mm A');


    const checkForPermission = async () => {
        try {
            await PermissionManager.AlarmPermission();
        } catch (e) {
            IntentLauncher.startActivity({
                action: 'android.settings.REQUEST_SCHEDULE_EXACT_ALARM',
                data: 'package:com.bhagvadgeeta.live'
            })
        }
    };


    const handleSetTime = (dateTime) => {
        const dateObject = new Date(dateTime);

        const OsVer = Platform?.constants['Release'];

        if (OsVer >= 13) {
            checkForPermission();
        }

        // If don't have permission then ask for it
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then((has) => {
            if (!has) {
                PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS');
            }
        });

        PushNotification.localNotificationSchedule({
            channelId: 'daily-verse',
            title: 'Bhagavad Gita - Reminder',
            message: 'Read your today verses.',
            date: dateObject,
            allowWhileIdle: false,
            repeatTime: 1,
            repeatType: 'day',
        });

        dispatch(setNotificationTime(dateTime));
    };

    const hideModal = () => {
        setShowPicker(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.mainView}>
                <View style={{ marginTop: 50 }} />
                <Title text={t("onboarding.ReminderTitle")} />
                <View style={{ marginTop: 20 }} />
                <Description text={t("onboarding.ReminderDesc")} />
            </View>
            <View style={{ marginTop: 20 }} />

            <View style={{ marginHorizontal: 5 }}>
                <SettingsCard title={t("more.Reminder")} icon={'bell'} value={notificationTime ? formatedTime : t('more.Not set')} onPress={() => setShowPicker(true)} />
            </View>

            <DateTimePickerModal
                key={showPicker}
                isVisible={showPicker}
                mode="time"
                date={new Date()}
                onConfirm={(value) => {
                    handleSetTime(value);
                }}
                onCancel={hideModal}
                onHide={hideModal}
                themeVariant={theme.dark ? 'dark' : 'light'}
            />

            <View style={{ marginRight: 25, marginTop: 60 }}>
                <CustomButton text={t("onboarding.Next")} onPress={() => { navigation.replace('Tabs') }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        paddingHorizontal: 25,
        marginTop: 50
    },
    selectorView: {
        backgroundColor: COLORS.darkCard,
    }
})

export default DailyReminder