import React, { createContext, useMemo, useReducer } from "react";
import { authReducer } from "../reducers";
import {
  AuthInitialState,
  CartInitialState,
  OrdersInitialState,
} from "../initialState";
import { IAuthActionType, IAuthReducer } from "../reducers/auth";
import cartReducer, { ICartActionType, ICartReducer } from "../reducers/cart";
import orderReducer, {
  IOrderActionType,
  IOrdersReducer,
} from "../reducers/order";

interface Props {
  children: React.ReactNode;
}

interface Context {
  auth: IAuthReducer;
  setAuth: React.Dispatch<IAuthActionType>;
  cart: ICartReducer;
  dispatchCart: React.Dispatch<ICartActionType>;
  orders: IOrdersReducer;
  dispatchOrders: React.Dispatch<IOrderActionType>;
}

export const StoreContext = createContext<Context>(null as any);

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useReducer(authReducer, AuthInitialState);
  // @ts-ignore
  const [cart, dispatchCart] = useReducer(cartReducer, CartInitialState);
  // @ts-ignore
  const [orders, dispatchOrders] = useReducer(orderReducer, OrdersInitialState);

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      cart,
      dispatchCart,
      orders,
      dispatchOrders,
    }),
    [auth, cart, orders]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
