import "../styles/_reset.scss";
import type { AppProps } from "next/app";
import { NotificationsProvider } from "cel/utils/notifications";
import { ThemeWrapper, ITheme } from "cel/themes";
import { AppBar } from "cel/ui";
import { useEffect, useState } from "react";
import NavMenu from "@components/navMenu/navMenu";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLightTheme(
        !(
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        )
      );
    }
  }, []);

  const changeTheme = (): void => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <ThemeWrapper themeName={isLightTheme ? ITheme.LIGHT : ITheme.DARK}>
      <NotificationsProvider>
        <>
          <AppBar changeTheme={changeTheme} isLightTheme={isLightTheme}>
            <NavMenu />
          </AppBar>
          <Component {...pageProps} />
        </>
      </NotificationsProvider>
    </ThemeWrapper>
  );
};

export default MyApp;
