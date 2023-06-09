export const colors = {
  white: '#FFFFFF',
  black: '#000000',
};

export type ColorsTheme = typeof darkTheme;

export const commonTheme = {
  white: colors.white,
  black: colors.black,

  // colors system

  blue: {
    primary: '#E3F5FF',
    a: '#A8C5DA',
    b: '#B1E3FF',
  },

  purple: {
    primary: '#E5ECF6',
    50: '#F2F5FA',
    a: '#95A4FC',
    b: '#C6C7F8',
  },

  primary: {
    '333': '#333333',
    brand: '#1C1C1C',
    '2e': '#2e2e2e',
    '5b': '#5b5b5b',
    d9: '#d9d9d9',
    light: '#F7F9FB',
  },

  green: {
    primary: '#78F381',
    bg: '#00A718',
    a: '#A1E3CB',
    b: '#BAEDBD',
    c: '#24c087',
  },

  yellow: {
    a: '#FFE899',
    b: '#F9D03F',
  },
  red: '#FF4747',

  button: {
    primary: '#000',
    white: '#000',
    transparent: '#000',
    'primary-transparent': '#000',
    'green-transparent': '#000',
  },
};

export const darkTheme = {
  ...commonTheme,
  // Background
  bg1: commonTheme.primary.brand,
  bg2: commonTheme.primary[333],
  bg3: '#404040',
  bg4: '#cecece',
  bg5: '#f2f2f2',

  // Text
  text1: '#F5F5F5',
  text2: '#898989',
  text3: '#e5e5e5',
  text4: commonTheme.purple.b,
  text5: '#4f43e2',
  text6: commonTheme.red,
  text7: commonTheme.primary.brand,
  text8: commonTheme.primary.brand,

  // Border
  border1: '#2c2c2c',
  border2: '#5b5b5b',
  border3: '#cecece',

  // Button
  btn1: '#1A73E8',
  btn2: '#404040',

  // Icons
  icon1: '#D9D9D9',
  icon2: '#D9D9D9',

  // Hover1
  hover1: '#3b3a3a',
};

export const lightTheme = {
  ...commonTheme,

  // Background
  bg1: commonTheme.white,
  bg2: commonTheme.white,
  bg3: '#F8F8F8',
  bg4: '#cecece',
  bg5: '#f2f2f2',

  // Text
  text1: commonTheme.black,
  text2: '#1C1C1C',
  text3: '#333333',
  text4: commonTheme.purple.b,
  text5: '#4f43e2',
  text6: '#ff4747',
  text7: commonTheme.primary.brand,
  text8: commonTheme.primary['5b'],

  // Border
  border1: '#e3e2e2',
  border2: '#F2F4F5',
  border3: '#1A73E8',

  // Button
  btn1: '#282828',
  btn2: commonTheme.white,

  // Icons
  icon1: commonTheme.black,
  icon2: '#BFBFBF',

  // Hover1
  hover1: '#D9D9D9',
};
