import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

export const theme = extendTheme(
  {
    colors: {
      light: {
        principal: '#0D2939',
        secondary: '#59471D',
        background: '#EDECEC',
        highlighted: '#2099A8',
        text: '#EDECEC',
        100: 'white',
        200: '#2099A8',
        500: '#93B93E',
        600: '#93B93E',
        800: '#EDECEC'
      },
      highligthed: {
        500: '#2099A8'
      },
      components: {
        InputGroup: {
          bg: 'white'
        }
      }
    },
    styles: {
      global: {
        body: {
          bg: '#EDECEC',
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'light',
    components: ['Button', 'Badge', 'Text', 'InputGroup'],
  })
);
