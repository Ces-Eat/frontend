import IRestaurantAction from "../action/restaurant";
import { IArticle, IMenu, IRestaurant } from "../types";

export interface IRestaurantReducer {
  isFetch: boolean;
  restaurant: IRestaurant | null;
}

export interface IRestaurantActionType {
  payload: IRestaurant | IMenu | IArticle | string | null;
  type: IRestaurantAction;
}

const authReducer = (
  state: IRestaurantReducer,
  { type, payload }: IRestaurantActionType
) => {
  switch (type) {
    case IRestaurantAction.SET:
      return {
        isFetch: true,
        restaurant: payload,
      };

    case IRestaurantAction.ADD_ARTICLE:
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          articles: [...state.restaurant.articles, payload],
        },
      };

    case IRestaurantAction.UPDATE_ARTICLE:
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          articles: state.restaurant.articles.map((article) => {
            if (article._id === payload._id) {
              return payload;
            }
            return article;
          }),
        },
      };

    case IRestaurantAction.DELETE_ARTICLE:
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          articles: state.restaurant.articles.filter(
            (article: IArticle) => article._id !== payload
          ),
        },
      };

    case IRestaurantAction.ADD_MENU:
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          menus: [...state.restaurant.menus, payload],
        },
      };

    case IRestaurantAction.UPDATE_MENU:
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          menus: state.restaurant.menus.map((menu) => {
            if (menu._id === payload._id) {
              return payload;
            }
            return menu;
          }),
        },
      };

    case IRestaurantAction.DELETE_MENU:
      return {
        ...state,
        restaurant: {
          ...state.restaurant,
          menus: state.restaurant.menus.filter(
            (menu: IMenu) => menu._id !== payload
          ),
        },
      };

    case IRestaurantAction.DELETE:
      return {
        isFetch: false,
        restaurant: null,
      };
    default:
      return state;
  }
};

export default authReducer;
