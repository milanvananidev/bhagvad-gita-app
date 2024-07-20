import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import MUI from 'react-native-vector-icons/MaterialIcons'
import { COLORS, FONTS } from '../../theme/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TaskCard = ({ text, isComplated, progress = 0, onPress, hideArrow = false }) => {

    const theme = useTheme();

    let editedProgress = Number(progress);
    if (editedProgress >= 100) {
        editedProgress = `100%`
    } else {
        editedProgress = `${progress}%`
    }

    return (
        <>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.mainView, { backgroundColor: theme.colors.card }]}>
                <Text style={[styles.text, { color: theme.colors.text }]}>{text}</Text>
                {
                    !hideArrow && (
                        (isComplated || editedProgress === '100%') && (
                            <MUI name={'check-circle'} color={theme.dark ? COLORS.primary2 : COLORS.primary} size={25} />) || (
                            <MUI name={'chevron-right'} color={theme.colors.text} size={30} />
                        )
                    ) || null
                }
            </TouchableOpacity>
            <View style={{ marginRight: 10 }}>
                {
                    (editedProgress !== '100%' && editedProgress !== '0%') && (
                        <View style={{
                            height: 3,
                            backgroundColor: theme.dark ? COLORS.primary2 : COLORS.primary,
                            marginLeft: 5,
                            borderRadius: 60,
                            top: -4,
                            width: editedProgress
                        }} />
                    ) || null
                }
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        marginTop: 15,
        height: 65,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        elevation: 2,
        zIndex: 999
    },
    text: {
        ...FONTS.fontPoppins
    }
})

export default TaskCard