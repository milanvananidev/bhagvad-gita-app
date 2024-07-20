import { View, Text, StatusBar, StyleSheet, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../theme/theme'
import Images from '../../constants/Images'
import Title from '../common/Title';
import Description from '../common/Description';
import LanguageSelector from './LanguageSelector';
import CustomButton from './CustomButton';
import { useTranslation } from 'react-i18next';

const Welcome = ({ setIndex }) => {

    const windowWidth = Dimensions.get('window').width;
    const { t, i18n } = useTranslation();

    const [selected, setSelected] = useState(i18n.language || 'en');

    return (
        <>
            <StatusBar backgroundColor={COLORS.primary2} />
            <View style={styles.mainView}>
                <Image source={Images.Logo} style={{ width: windowWidth - 80 }} resizeMode='contain' />
            </View>

            <View style={styles.bottomView}>
                <Title text={t("onboarding.Welcome")} />
                <Description text={t("onboarding.WelcomeDesc")} />

                <LanguageSelector selected={selected} setSelected={setSelected} />

                <View style={{ width: '100%', marginTop: 50 }}>
                    <CustomButton text={t("onboarding.StartButton")} onPress={() => { setIndex((index) => index + 1) }} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary2,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        elevation: 3
    },
    bottomView: {
        flex: 1,
        paddingHorizontal: 25,
        marginTop: 40,
        alignItems: 'flex-start'
    }
})

export default Welcome