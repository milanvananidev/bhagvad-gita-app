import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import WallpaperCard from '../components/wallpaper/WallpaperCard';

const SingleWallpaper = () => {

    const route = useRoute();
    const wallpaper = route.params?.Wallpaper

    return (
        <View style={styles.mainView}>
            <WallpaperCard Wallpaper={wallpaper} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SingleWallpaper