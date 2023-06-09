import React, { useMemo } from 'react';
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import { getTheme } from '@/theme/index';
import { Poppins, Rowdies } from 'next/font/google';

const poppins = Poppins({ weight: ['300', '400', '700'], subsets: ['latin'] });
const rowdies = Rowdies({ weight: ['300', '400'], subsets: ['latin'] });

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const darkMode = false;
  const themeObject = useMemo(() => getTheme(darkMode), [darkMode]);
  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
}

export const ThemedGlobalStyle = createGlobalStyle`

  html{
    font-size: 16px;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.bg1};
    background-color: ${({ theme }) => theme.bg1};

    body{
      --bs-body-font-family: ${poppins.style.fontFamily};
       --rowdies-font: ${rowdies.style.fontFamily};
    }

    @media screen and (min-width: 1920px) {
      font-size: 18px;
    }

    @media screen and (min-width: 2048px) {
      font-size: 20px;
    }
    


    h3 {
      font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSizes.h3};
      line-height: ${({ theme }: { theme: DefaultTheme }) => theme.lineHeight.h3};
    }
    h5 {
      font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSizes.h5};
      line-height: ${({ theme }: { theme: DefaultTheme }) => theme.lineHeight.h5};
    }
    h6 {
      font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSizes.h6};
      line-height: ${({ theme }: { theme: DefaultTheme }) => theme.lineHeight.h6};
    }
    p {
      color: ${({ theme }: { theme: DefaultTheme }) => theme.text1};
    }

    a{
      color: inherit;
      text-decoration: none;

      &:hover{
        color: inherit;
        text-decoration: underline;
      }
    }

}

  summary::-webkit-details-marker {
    display:none;
  }



`;
