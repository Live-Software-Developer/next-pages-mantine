import React from 'react'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import NextApp, { AppProps, AppContext } from 'next/app';
import Head from 'next/head'
import { getCookie } from 'cookies-next'
import MainProvider from '../layouts/MainProvider'
import { APP_NAME, DEFAULT_APP_URL, THEME_COOKIE_NAME } from '../config/constants'
import { ColorScheme } from '@mantine/core';


// CSS Styles import
import './../styles/global.css'
import Script from 'next/script';
import { LOCAL_STORAGE_KEYS } from '../providers/appProvider';

// This is to allow different pages to have different layouts since we are not using the app directory.
type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType<{ children: React.ReactNode }>,
  },
  colorScheme: ColorScheme,
  user: any,
  loginStatus: any,
}

export default function App({ Component, pageProps, colorScheme, loginStatus }: ComponentWithPageLayout) {
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
      </Head>
      <Script src="https://embed.tawk.to/619959c96885f60a50bcbe1e/1fkvgdfr8" strategy='afterInteractive' />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-06MXTHHEPV" strategy='afterInteractive' async />
      <Script src={`${DEFAULT_APP_URL}/static/js/googleanalytics.js`} strategy='afterInteractive' />

      <MainProvider colorScheme_={colorScheme}>
        {
          Component.PageLayout ? (
            <Component.PageLayout>
              <Component {...pageProps} />
            </Component.PageLayout>
          )
            :
            <Component {...pageProps} />
        }
      </MainProvider>
    </>
  );
}


App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie(THEME_COOKIE_NAME, appContext.ctx) || 'dark',
    user: getCookie(LOCAL_STORAGE_KEYS.user, appContext.ctx) || null,
    loginStatus: getCookie(LOCAL_STORAGE_KEYS.login_status, appContext.ctx) || false,
  };
};