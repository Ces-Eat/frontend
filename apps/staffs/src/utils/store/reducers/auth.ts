import { IAuthAction } from "../action";

interface IAuthUser {
  email: string;
  image: string | null;
  name: string;
  phone: string;
  roleId: number;
  surname: string;
}

export interface IAuthReducer {
  isAuthenticated: boolean;
  user: IAuthUser | null;
}

export interface IAuthActionType {
  payload: IAuthUser | null;
  type: IAuthAction;
}

const authReducer = (
  state: IAuthReducer,
  { type, payload }: IAuthActionType
) => {
  switch (type) {
    case IAuthAction.LOGIN:
      return {
        isAuthenticated: true,
        user: payload,
      };
    case IAuthAction.LOGOUT:
      return {
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
