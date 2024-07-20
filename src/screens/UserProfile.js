import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Header from '../layout/Header'
import { useTranslation } from 'react-i18next'

const UserProfile = () => {

    const { t } = useTranslation();

    return (
        <View>
            <Header title={t("more.Profile")} leftIcon={'back'} />

        </View>
    )
}

const styles = StyleSheet.create({

})

export default UserProfile