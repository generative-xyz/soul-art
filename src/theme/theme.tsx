import React, { useMemo } from 'react';
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';
import { getTheme } from '@/theme/index';
import { Righteous } from 'next/font/google';
import { Sora } from 'next/font/google';
import localFont from 'next/font/local';

const bandeinsSansVariable = localFont({
  src: [
    {
      path: './fonts/BandeinsSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/BandeinsSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/BandeinsSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/BandeinsSans-SemiBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/BandeinsSans-Bold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
});

const righteous = Righteous({ weight: ['400'], subsets: ['latin'] });
const sora = Sora({ weight: ['400', '700'], subsets: ['latin'] });

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
    background-color: ${({ theme }) => theme.bg1};

    body {
      --bs-body-font-family: ${bandeinsSansVariable.style.fontFamily};
      --righteous-font: ${righteous.style.fontFamily};
      --sora-font: ${sora.style.fontFamily};
      overflow-y: scroll;
    }

    @media screen and (min-width: 1920px) {
      font-size: 18px;
    }

    @media screen and (min-width: 2048px) {
      font-size: 20px;
    }

    h3 {
      font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSizes.h3};
      line-height: ${({ theme }: { theme: DefaultTheme }) =>
    theme.lineHeight.h3};
    }
    h5 {
      font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSizes.h5};
      line-height: ${({ theme }: { theme: DefaultTheme }) =>
    theme.lineHeight.h5};
    }
    h6 {
      font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fontSizes.h6};
      line-height: ${({ theme }: { theme: DefaultTheme }) =>
    theme.lineHeight.h6};
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
