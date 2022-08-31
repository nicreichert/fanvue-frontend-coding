import type { AppProps } from "next/app";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import lightTheme from "../themes/lightTheme";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <Head>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>

      <CssBaseline />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
