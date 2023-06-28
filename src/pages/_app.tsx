import ClientOnly from '@/components/Utils/ClientOnly';
import Web3Provider from '@/components/Web3Provider';
import { CDN_URL } from '@/configs';
import { SEO_DESCRIPTION, SEO_IMAGE, SEO_TITLE } from '@/constants/seo';
import { AssetsProvider } from '@/contexts/assets-context';
import { WalletProvider } from '@/contexts/wallet-context';
import store from '@/state';
import '@/styles/index.scss';
import ThemeProvider, { ThemedGlobalStyle } from '@/theme/theme';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNprogress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  const { seoInfo = {} } = pageProps;
  const { title, description, image } = seoInfo;

  return (
    <>
      <Head>
        <title>{title ?? SEO_TITLE}</title>
        <meta property="og:title" content={title ?? SEO_TITLE} />
        <meta
          property="og:description"
          content={description ?? SEO_DESCRIPTION}
        />
        <meta property="og:image" content={image ?? SEO_IMAGE} />
        <meta property="og:type" content="website" />
        <meta property="twitter:title" content={title ?? SEO_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content={description ?? SEO_DESCRIPTION}
        />
        <meta name="twitter:image" content={image ?? SEO_IMAGE} />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta name="theme-color" content="#ffffff"></meta>
        <link
          rel="icon"
          type="image/svg"
          sizes="16x16 32x32"
          href={`${CDN_URL}/ic-logo-black.svg`}
        />
        <link
          rel="apple-touch-icon"
          sizes="16x16 32x32"
          href={`${CDN_URL}/ic-logo-black.svg`}
        />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
      </Head>

      <ClientOnly>
        <Provider store={store}>
          <ThemeProvider>
            <ThemedGlobalStyle />
            <Web3Provider>
              <WalletProvider>
                <AssetsProvider>
                  <Component {...pageProps} />
                </AssetsProvider>
                <Toaster position="top-center" reverseOrder={false} />
              </WalletProvider>
            </Web3Provider>
          </ThemeProvider>
        </Provider>
        <NextNprogress color="#1c1c1c" />
      </ClientOnly>
    </>
  );
}
