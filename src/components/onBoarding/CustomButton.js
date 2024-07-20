import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../theme/theme'

const CustomButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.mainBtn}>
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainBtn: {
        backgroundColor: COLORS.primary2,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    btnText: {
        color: COLORS.darkCard,
        ...FONTS.fontPoppins,
        fontSize: 15
    }
})

export default CustomButton