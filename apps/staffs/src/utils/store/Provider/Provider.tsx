import React, { createContext, useMemo, useReducer, useState } from "react";
import { authReducer } from "../reducers";
import { AuthInitialState } from "../initialState";
import { IAuthActionType, IAuthReducer } from "../reducers/auth";
import { MsValue } from "../action";

interface Props {
  children: React.ReactNode;
}

interface Context {
  auth: IAuthReducer;
  setAuth: React.Dispatch<IAuthActionType>;
  msUser: MsValue;
  setMsUser: React.Dispatch<React.SetStateAction<MsValue>>;
  msRestaurant: MsValue;
  setMsRestaurant: React.Dispatch<React.SetStateAction<MsValue>>;
  msOrder: MsValue;
  setMsOrder: React.Dispatch<React.SetStateAction<MsValue>>;
}

export const StoreContext = createContext<Context>(null as any);

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useReducer(authReducer, AuthInitialState);
  const [msUser, setMsUser] = useState<MsValue>(MsValue.PENDING);
  const [msRestaurant, setMsRestaurant] = useState<MsValue>(MsValue.PENDING);
  const [msOrder, setMsOrder] = useState<MsValue>(MsValue.PENDING);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      msUser,
      setMsUser,
      msRestaurant,
      setMsRestaurant,
      msOrder,
      setMsOrder,
    }),
    [auth, msUser, msRestaurant, msOrder]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
