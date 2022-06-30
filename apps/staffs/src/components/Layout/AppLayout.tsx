import { AppBar } from "@ceseatslib/ui";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import NavMenu from "src/components/NavMenu/NavMenu";
import { IAuthAction, MsValue, useStore } from "src/utils/hooks";
import axios from "axios";
import { LoadingPage } from "@ceseatslib/template";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";

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
  const { createNotification } = useNotificationCenter();
  const timer = useRef(null);

  const {
    setAuth,
    auth: { isAuthenticated, user },
    setMsOrder,
    setMsRestaurant,
    setMsUser,
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

  useEffect(() => {
    if (isAuthenticated && user?.role.id === 5) {
      timer.current = setInterval(() => {
        axios
          .get(`${process.env.API_HEALTHCHECK}/ms-auth`)
          .then(() => {
            setMsUser(MsValue.UP);
          })
          .catch(() => {
            createNotification(INotificationType.ERROR, "MS Users down");
            setMsUser(MsValue.DOWN);
          });
        axios
          .get(`${process.env.API_HEALTHCHECK}/ms-restaurant`)
          .then(() => {
            setMsRestaurant(MsValue.UP);
          })
          .catch(() => {
            createNotification(INotificationType.ERROR, "MS Restaurant down");
            setMsRestaurant(MsValue.DOWN);
          });
        axios
          .get(`${process.env.API_HEALTHCHECK}/ms-order`)
          .then(() => {
            setMsOrder(MsValue.UP);
          })
          .catch(() => {
            createNotification(INotificationType.ERROR, "MS Order down");
            setMsOrder(MsValue.DOWN);
          });
      }, 20000);
    } else if (timer.current) {
      clearTimeout(timer.current);
    }
  }, [isAuthenticated]);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <AppBar
        changeTheme={changeTheme}
        isLightTheme={isLightTheme}
        link={isAuthenticated ? "/home" : "/"}
        showMenu={isAuthenticated}
      >
        {isAuthenticated && <NavMenu />}
      </AppBar>
      {children}
    </>
  );
};

export default AppLayout;
