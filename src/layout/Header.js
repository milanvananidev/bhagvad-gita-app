import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FONTS, ICONS, SIZES} from '../theme/theme';
import DropShadow from 'react-native-drop-shadow';
import {useTranslation} from 'react-i18next';
import {getFromStorage} from '../utils/localStorage';
const Header = (props) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const title = props?.title;

  const [forceUpdae, setForceUpdate] = useState(false);

  useEffect(() => {
    setForceUpdate(!forceUpdae);
  }, [props?.title]);

  const onGoBack = () => {
    try {
      navigation.goBack();
    } catch (error) {
      console.log('Error in goBack header');
    }
  };


  return (
    <>
      <View
        style={[props.transparent && {
          position: 'absolute',
          zIndex: 1,
          width: '100%',
        }]}
        key={forceUpdae}
      >
        <DropShadow
          style={[{
            shadowColor: '#000',
            shadowOffset: {
              width: 5,
              height: 5,
            },
            shadowOpacity: props.bgWhite ? 0.15 : 0,
            shadowRadius: 5,
          }, Platform.OS === 'ios' && {
            backgroundColor: props.bgWhite ? colors.card : 'transparent',
          }]}
        >
          <View style={[{
            paddingHorizontal: 15,
            paddingVertical: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }]}>

            {props.leftIcon === 'close' &&
                            <TouchableOpacity
                              accessible={true}
                              accessibilityLabel="Go back"
                              accessibilityHint="Navigates to the previous screen"
                              onPress={() => onGoBack()}
                              style={{
                                height: 45,
                                width: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                marginRight: 10,
                              }}
                            >
                              <SvgXml
                                height={30}
                                width={30}
                                stroke={colors.title}
                                xml={ICONS.close}
                              />
                            </TouchableOpacity>
            }
            {props.leftIcon === 'back' &&
                            <TouchableOpacity
                              onPress={() => {
 props.backNavigate ? navigation.navigate(props.backNavigate) : navigation.goBack();
                              }}
                              style={{
                                height: 45,
                                width: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: SIZES.radius,
                                marginRight: 10,
                              }}
                            >
                              <MaterialIcons name="arrow-back" color={colors.text} size={22} />
                            </TouchableOpacity>
            }
            <Text style={[FONTS.h4, {color: colors.text, flex: 1}, props.titleCenter && {textAlign: 'center', marginRight: 55}]}>
              {title}
            </Text>

          </View>
        </DropShadow>
      </View>
    </>
  );
};

export default Header;
