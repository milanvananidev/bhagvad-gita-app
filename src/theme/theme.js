import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

export const COLORS = {
  primary: '#4b0f0f',
  primary2: '#f9a656',
  primary3: '#337bff',
  primary4: '#ff50a2',
  primary5: '#577bff',
  primary6: '#4053FF',
  primary7: '#00AB8C',
  yellow: '#FFCD90',
  darkCard: '#444444',
  secondary: '#704FFE',
  success: '#54D969',
  danger: '#ff4a5c',
  warning: '#ffb02c',
  white: '#fff',
  info: '#4cb1ff',
  text: 'rgba(0,0,0,0.8)',
  primayLight: 'rgba(255,144,99,.13)',
  primayLight2: 'rgba(0,196,132,.12)',
  primayLight3: 'rgba(51,123,255,.15)',
  primayLight4: 'rgba(255,80,162,.2)',
  primayLight5: 'rgba(87,123,255,.2)',
  textLight: 'rgba(0,0,0,.5)',
  title: '#2F2F2F',
  dark: '#2f2f2f',
  light: '#E6E6E6',
  borderColor: '#E6E6E6',
  darkBorder: 'rgba(255, 255, 255, 0.2)',
  darkBg: '#333',
  placeholderColor: '#646464',
  red: '#f85c6f',
  redLight: 'rgba(248,92,111,.2)',
  themePrimary: '#1630C2',
  themeSecondary: '#FF74B9',
};

export const SIZES = {
  fontLg: 16,
  font: 14,
  fontSm: 13,
  fontXs: 12,

  // radius
  radius_sm: 8,
  radius: 12,
  radius_md: 18,

  // space
  padding: 15,
  margin: 15,

  // Font Sizes
  h1: 40,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,

  // App dimensions
  width,
  height,

};
export const FONTS = {

  fontPoppins: { fontFamily: 'Poppins-SemiBold' },
  fontPoppinsBold: { fontFamily: 'Poppins-Bold' },
  fontPoppinsSemiBold: { fontFamily: 'Poppins-SemiBold' },
  fontPoppinsExtraBold: { fontFamily: 'Poppins-ExtraBold' },
  fontPoppinsMedium: { fontFamily: 'Poppins-Medium' },
  fontPoppinsRegular: { fontFamily: 'Poppins-Regular' },

  fontNunito: { fontFamily: 'NunitoSans-Regular' },
  fontNunitoBold: { fontFamily: 'NunitoSans-Bold' },
  fontNunitoExtraBold: { fontFamily: 'NunitoSans-ExtraBold' },
  fontNunitoSemiBold: { fontFamily: 'NunitoSans-SemiBold' },

  fontLg: { fontSize: SIZES.fontLg, color: COLORS.text, lineHeight: 20, fontFamily: 'NunitoSans-Bold' },
  font: { fontSize: SIZES.font, color: COLORS.text, lineHeight: 20, fontFamily: 'NunitoSans-Regular' },
  fontSm: { fontSize: SIZES.fontSm, color: COLORS.text, lineHeight: 18, fontFamily: 'NunitoSans-Regular' },
  fontXs: { fontSize: SIZES.fontXs, color: COLORS.text, lineHeight: 14, fontFamily: 'NunitoSans-Regular' },
  h1: { fontSize: SIZES.h1, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  h2: { fontSize: SIZES.h2, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  h3: { fontSize: SIZES.h3, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  h4: { fontSize: SIZES.h4, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  h5: { fontSize: SIZES.h5, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },
  h6: { fontSize: SIZES.h6, color: COLORS.title, fontFamily: 'Poppins-SemiBold' },

  fontBold: { fontFamily: 'NunitoSans-Bold' },

};

export const ICONS = {

};

export const IMAGES = {

};


const appTheme = { COLORS, SIZES, FONTS, ICONS, IMAGES };

export default appTheme;
