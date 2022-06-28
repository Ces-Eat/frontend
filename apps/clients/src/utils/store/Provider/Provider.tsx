import React, { createContext, useMemo, useReducer } from "react";
import { authReducer } from "../reducers";
import { AuthInitialState, CartInitialState } from "../initialState";
import { IAuthActionType, IAuthReducer } from "../reducers/auth";
import cartReducer, { ICartActionType, ICartReducer } from "../reducers/cart";

interface Props {
  children: React.ReactNode;
}

interface Context {
  auth: IAuthReducer;
  setAuth: React.Dispatch<IAuthActionType>;
  cart: ICartReducer;
  dispatchCart: React.Dispatch<ICartActionType>;
}

export const StoreContext = createContext<Context>(null as any);

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useReducer(authReducer, AuthInitialState);
  // @ts-ignore
  const [cart, dispatchCart] = useReducer(cartReducer, CartInitialState);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      cart,
      dispatchCart,
    }),
    [auth, cart]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
