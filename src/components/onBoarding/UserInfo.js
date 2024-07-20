import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Title from '../common/Title'
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from './CustomButton';
import Description from '../common/Description';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../redux/actions/user';

const UserInfo = ({ setIndex }) => {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');

    const updateUserDetails = () => {
        dispatch(setUserDetails({
            Firstname: fName,
            Lastname: lName
        }))
        setIndex((index) => index + 1);
    };

    return (
        <View style={styles.mainView}>
            <View style={{ marginTop: 40 }} />
            <Title text={t("onboarding.NameTitle")} />
            <View style={{ marginTop: 20 }} />
            <Description text={t("onboarding.NameDesc")} />

            <CustomTextInput placeholder={'First Name'} value={fName} onChange={(text) => { setFName(text) }} />
            <CustomTextInput placeholder={'Last Name'} value={lName} onChange={(text) => { setLName(text) }} />

            <View style={{ marginTop: 80 }} />
            <CustomButton text={t("onboarding.Next")} onPress={updateUserDetails} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingHorizontal: 25,
        marginTop: 50
    }
})

export default UserInfo