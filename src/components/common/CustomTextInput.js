import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { COLORS, FONTS } from '../../theme/theme'
import { useTheme } from '@react-navigation/native'

const CustomTextInput = ({ value, placeholder, onChange }) => {

    const theme = useTheme();

    return (
        <>
            <TextInput
                style={[styles.textInput, { color: theme.colors.text, backgroundColor: theme.colors.card }]}
                placeholder={placeholder}
                placeholderTextColor={'#6d6d6d'}
                onChangeText={(text) => onChange(text)}
                value={value}
            />
        </>
    )
}

const styles = StyleSheet.create({
    textInput: {
        paddingVertical: 15,
        borderRadius: 10,
        paddingLeft: 15,
        marginVertical: 10,
        ...FONTS.fontPoppins,
        fontSize: 15,
        alignItems: 'center'
    }
})

export default CustomTextInput