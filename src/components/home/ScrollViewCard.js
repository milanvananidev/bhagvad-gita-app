import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native'
import { FONTS } from '../../theme/theme'
import { useTranslation } from 'react-i18next'

const ScrollViewCard = ({ item }) => {

    const { i18n } = useTranslation();
    const theme = useTheme();
    const navigation = useNavigation();

    const isHindi = i18n.language === 'hi';

    const onClick = () => {
        navigation.navigate('peace', {
            data: item
        })
    }

    return (
        <TouchableOpacity onPress={onClick} activeOpacity={0.8} style={[styles.mainView, { backgroundColor: theme.colors.card }]}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
            </View>
            <Text style={[styles.text, { color: theme.colors.text }]}>{isHindi ? item?.title_hindi : item?.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: '48%',
        aspectRatio: 1 / 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 20,
        padding: 15,
        elevation: 2
    },
    imageContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 40,
        width: 40
    },
    text: {
        ...FONTS.fontPoppins,
        marginTop: 15,
        textAlign: 'center'
    }
})

export default ScrollViewCard