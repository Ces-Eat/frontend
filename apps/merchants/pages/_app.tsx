import "../styles/_reset.scss";
import type { AppProps } from "next/app";
import { NotificationProvider } from "@ceseatslib/utils";
import { ThemeWrapper, ITheme } from "@ceseatslib/theme";
import { useEffect, useState } from "react";
import { StoreProvider } from "src/utils/store";
import AppLayout from "src/components/Layout/AppLayout";
import AuthGuard from "src/utils/AuthGuard";

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
      <StoreProvider>
        <NotificationProvider>
          <AppLayout changeTheme={changeTheme} isLightTheme={isLightTheme}>
            {
              // @ts-ignore
              Component.requireAuth ? (
                <AuthGuard requireAuth={Component.requireAuth}>
                  <Component {...pageProps} />
                </AuthGuard>
              ) : (
                <Component {...pageProps} />
              )
            }
          </AppLayout>
        </NotificationProvider>
      </StoreProvider>
    </ThemeWrapper>
  );
};

export default MyApp;
