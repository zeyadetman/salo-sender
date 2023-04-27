import "@/styles/globals.css";
import { Button, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
// @ts-ignore
import { theme } from "mui-minimal-theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
