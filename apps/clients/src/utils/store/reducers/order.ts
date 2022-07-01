import { IOrderAction } from "../action";

export interface IOrdersReducer {
  isAuthenticated: boolean;
  order: any[];
}

export interface IOrderActionType {
  payload: any;
  type: IOrderAction;
}

const orderReducer = (
  state: IOrdersReducer,
  { type, payload }: IOrderActionType
) => {
  switch (type) {
    case IOrderAction.ADD_ORDER:
      return {
        ...state,
        order: [...state.order, payload],
      };
    case IOrderAction.SET_ORDER:
      return {
        ...state,
        order: payload,
      };
    case IOrderAction.REMOVE_ORDER:
      return {
        ...state,
        order: state.order.filter((order) => order._id !== payload),
      };
    default:
      return state;
  }
};

export default orderReducer;
