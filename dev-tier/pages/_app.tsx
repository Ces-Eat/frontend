import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NotificationProvider } from "@ceseatslib/utils";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  );
}

export default MyApp;
