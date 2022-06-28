import React, { createContext, useMemo, useReducer, useState } from "react";
import { AuthInitialState } from "../initialState";
import { authReducer } from "../reducers";
import { IAuthActionType, IAuthReducer } from "../reducers/auth";

interface Props {
  children: React.ReactNode;
}

interface Context {
  auth: IAuthReducer;
  setAuth: React.Dispatch<IAuthActionType>;
  isRestaurant: boolean;
  setIsRestaurant: React.Dispatch<boolean>;
}

export const StoreContext = createContext<Context>(null as any);

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useReducer(authReducer, AuthInitialState);
  const [isRestaurant, setIsRestaurant] = useState(false);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      isRestaurant,
      setIsRestaurant,
    }),
    [auth, isRestaurant]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
