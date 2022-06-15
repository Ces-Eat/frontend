import "../styles/_reset.scss";
import type { AppProps } from "next/app";
import { NotificationsProvider } from "cel/utils/notifications";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <NotificationsProvider>
    <Component {...pageProps} />
  </NotificationsProvider>
);

export default MyApp;
