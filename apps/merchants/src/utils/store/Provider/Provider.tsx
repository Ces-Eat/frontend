import React, { createContext, useMemo, useReducer } from "react";
import { AuthInitialState } from "../initialState";
import { authReducer, restaurantReducer } from "../reducers";
import { IAuthActionType, IAuthReducer } from "../reducers/auth";
import {
  IRestaurantActionType,
  IRestaurantReducer,
} from "../reducers/restaurant";

interface Props {
  children: React.ReactNode;
}

interface Context {
  auth: IAuthReducer;
  setAuth: React.Dispatch<IAuthActionType>;
  restaurant: IRestaurantReducer;
  setRestaurant: React.Dispatch<IRestaurantActionType>;
}

export const StoreContext = createContext<Context>(null as any);

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useReducer(authReducer, AuthInitialState);
  const [restaurant, setRestaurant] = useReducer(restaurantReducer, {
    isFetch: false,
    restaurant: null,
  });

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      restaurant,
      setRestaurant,
    }),
    [auth, restaurant]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
