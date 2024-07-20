import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../layout/Header'
import AllChapters from '../components/home/AllChapters'
import LastReadVerse from '../components/home/LastReadVerse'
import { useNetInfo } from '@react-native-community/netinfo'

const FullGita = () => {

    const netInfo = useNetInfo();

    return (
        <>
            <View style={{ marginTop: 20 }} />
            <Header leftIcon={'back'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainView}>
                    {netInfo?.isConnected ? <LastReadVerse /> : null}
                    <AllChapters />
                </View>
            </ScrollView>
        </>
    )
}

export const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: 25
    }
})

export default FullGita