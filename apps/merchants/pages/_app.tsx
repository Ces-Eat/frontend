import "../styles/_reset.scss";
import type { AppProps } from "next/app";
import { NotificationProvider } from "@ceseatslib/utils";
import { ThemeWrapper, ITheme } from "@ceseatslib/theme";
import { AppBar } from "@ceseatslib/ui";
import { useEffect, useState } from "react";
import NavMenu from "../src/components/NavMenu/NavMenu";

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
      <NotificationProvider>
        <>
          <AppBar
            changeTheme={changeTheme}
            isLightTheme={isLightTheme}
            link="/restaurant"
          >
            <NavMenu />
          </AppBar>
          <Component {...pageProps} />
        </>
      </NotificationProvider>
    </ThemeWrapper>
  );
};

export default MyApp;
