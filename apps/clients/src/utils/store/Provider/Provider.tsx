import React, { createContext, useMemo, useReducer } from "react";
import { authReducer } from "../reducers";
import { AuthInitialState } from "../initialState";
import { IAuthActionType, IAuthReducer } from "../reducers/auth";

interface Props {
  children: React.ReactNode;
}

interface Context {
  auth: IAuthReducer;
  setAuth: React.Dispatch<IAuthActionType>;
}

export const StoreContext = createContext<Context>(null as any);

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useReducer(authReducer, AuthInitialState);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
