import { configureFonts, DarkTheme } from 'react-native-paper';
import { DefaultTheme } from '@react-navigation/native';
const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      
      fontWeight: 'normal',
    },
    medium: {
      
      fontWeight: 'normal',
    },
    light: {
      
      fontWeight: 'normal',
    },
    thin: {
      
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  }
};


const Theme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    animation: {
      scale: 1.0,
    },
    fonts: configureFonts(fontConfig),
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      secondary: '#1E1F24',
      tertiary: '#3498db',
      table: '#353535',
      primaryShadow: 'rgba(52, 152, 219, 0.2)'
    },
    fontSize: {
      massive: 30,
      tableHeader: 16,
      title: 12,
      text: 10,
      paragraph: 8
    }
  };


export default Theme