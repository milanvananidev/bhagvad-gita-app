import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTS } from '../../theme/theme'

const Description = ({ text }) => {
    return (
        <View>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        ...FONTS.fontNunito,
        fontSize: 18,
        marginBottom: 25,
        color: '#fff'
    }
})

export default Description