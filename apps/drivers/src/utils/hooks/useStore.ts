import { useContext } from "react";
import { StoreContext } from "../store";

export * from "../store/action";

export const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};
