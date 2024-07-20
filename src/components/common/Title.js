import { View, Text, StyleSheet } from 'react-native'
import React, { Children } from 'react'
import { COLORS, FONTS } from '../../theme/theme'

const Title = ({ text }) => {
    return (
        <Text style={styles.title}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        color: COLORS.primary2,
        ...FONTS.fontBold,
        fontSize: 30,
        paddingVertical: 10,
        lineHeight: 34
    }
})

export default Title