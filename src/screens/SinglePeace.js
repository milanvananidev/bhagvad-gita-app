import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Header from '../layout/Header'
import { useNavigation, useRoute } from '@react-navigation/native'
import TaskCard from '../components/home/TaskCard'
import { useTranslation } from 'react-i18next'

const SinglePeace = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    const data = route.params.data;
    const isHindi = i18n.language === 'hi';

    return (
        <>
            <Header title={isHindi ? data?.title_hindi : data?.title} leftIcon={'back'} />
            <View style={styles.mainView}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
                    {
                        data?.verses?.map((item, index) => {
                            return <TaskCard
                                key={index}
                                text={`${t("home.Chapter", { chapter: item.chapter })} -${t("home.Verse", { verse: item.verse })}`}
                                onPress={() => { navigation.navigate("verse", { chapter: item.chapter, verse: item.verse }) }}
                            />
                        })
                    }
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: 25
    }
})

export default SinglePeace