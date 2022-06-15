import "../styles/_reset.scss";
import type { AppProps } from "next/app";
import { NotificationsProvider } from "cel/utils/notifications";
import { ThemeWrapper, ITheme } from "cel/themes";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeWrapper themeName={ITheme.LIGHT}>
    <NotificationsProvider>
      <Component {...pageProps} />
    </NotificationsProvider>
  </ThemeWrapper>
);

export default MyApp;
