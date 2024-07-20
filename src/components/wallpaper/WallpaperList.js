import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native'

const WallpaperList = ({ Wallpaper }) => {

    const theme = useTheme();
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('singlewallpaper', { Wallpaper })
    }

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.mainView, { backgroundColor: theme.colors.primary }]}>
            <Image style={styles.image} source={Wallpaper} resizeMode={'cover'} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: '48%',
        aspectRatio: 9 / 16,
        margin: 5,
        borderRadius: 9,
        overflow: 'hidden',
        elevation: 3,
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default WallpaperList