import { AppBar } from "@ceseatslib/ui";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavMenu from "src/components/NavMenu/NavMenu";
import { IAuthAction, useStore } from "src/utils/hooks";
import axios from "axios";
import { LoadingPage } from "@ceseatslib/template";

interface Props {
  children: React.ReactNode;
  isLightTheme: boolean;
  changeTheme: Dispatch<SetStateAction<boolean>>;
}

const AppLayout: React.FC<Props> = ({
  children,
  changeTheme,
  isLightTheme,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    setAuth,
    auth: { isAuthenticated },
  } = useStore();

  useEffect(() => {
    if (!isAuthenticated) {
      axios
        .get(`${process.env.API_USERS}/me`, { withCredentials: true })
        .then(({ data }) => {
          setAuth({ payload: data, type: IAuthAction.LOGIN });
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <AppBar
        changeTheme={changeTheme}
        isLightTheme={isLightTheme}
        link={isAuthenticated ? "/restaurants" : "/"}
        showMenu={isAuthenticated}
      >
        {isAuthenticated && <NavMenu />}
      </AppBar>
      {children}
    </>
  );
};

export default AppLayout;
