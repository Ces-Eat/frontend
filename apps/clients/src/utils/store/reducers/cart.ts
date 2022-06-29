/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
import { ICartAction } from "../action";

export interface IArticle {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IMenu {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  content: {
    sectionName: string;
    articles: IArticle[];
  }[];
}

export interface ICartReducer {
  [id: string]: {
    articles: IArticle[];
    menus: IMenu[];
    price: number;
  };
}

export interface ICartActionType {
  payload: {
    id: string;
    article?: IArticle;
    menu?: IMenu;
  };
  type: ICartAction;
}

const cartReducer = (
  state: ICartReducer,
  { type, payload }: ICartActionType
) => {
  const { id, article, menu } = payload;

  switch (type) {
    case ICartAction.ADD_ARTICLE:
      const articleToAdd = { ...article, quantity: 1 };

      if (state[id]) {
        const { articles } = state[id];
        const articleIndex = articles.findIndex((a) => a._id === article!._id);

        if (articleIndex !== -1) {
          articles[articleIndex].quantity++;
        } else {
          // @ts-ignore
          articles.push(articleToAdd);
        }
        return {
          ...state,
          [id]: {
            ...state[id],
            articles,
            price: state[id].price + article!.price,
          },
        };
      }
      return {
        ...state,
        [id]: {
          articles: [articleToAdd],
          menus: [],
          price: article!.price,
        },
      };

    case ICartAction.REMOVE_ARTICLE:
      if (state[id]) {
        const { articles } = state[id];
        const articleIndex = articles.findIndex((a) => a._id === article!._id);

        if (articleIndex !== -1) {
          articles[articleIndex].quantity--;
          if (articles[articleIndex].quantity === 0) {
            articles.splice(articleIndex, 1);
          }
          return {
            ...state,
            [id]: {
              ...state[id],
              articles,
              price: state[id].price - article!.price,
            },
          };
        }
      }
      return state;

    case ICartAction.ADD_MENU:
      const menuToAdd = { ...menu, quantity: 1 };

      if (state[id]) {
        const { menus } = state[id];
        const menuIndex = menus.findIndex((m) => m._id === menu!._id);

        if (menuIndex !== -1) {
          menus[menuIndex].quantity++;
        } else {
          // @ts-ignore
          menus.push(menuToAdd);
        }
        return {
          ...state,
          [id]: {
            ...state[id],
            menus,
            price: state[id].price + menu!.price,
          },
        };
      }
      return {
        ...state,
        [id]: {
          articles: [],
          menus: [menuToAdd],
          price: menu!.price,
        },
      };

    case ICartAction.REMOVE_MENU:
      if (state[id]) {
        const { menus } = state[id];
        const menuIndex = menus.findIndex(
          (m) => m._id === menu!._id && m.content === menu!.content
        );

        if (menuIndex !== -1) {
          menus[menuIndex].quantity--;
          if (menus[menuIndex].quantity === 0) {
            menus.splice(menuIndex, 1);
          }
          return {
            ...state,
            [id]: {
              ...state[id],
              menus,
              price: state[id].price - menu!.price,
            },
          };
        }
      }
      return state;

    case ICartAction.DELETE:
      // eslint-disable-next-line no-param-reassign
      delete state[id];
      return state;
    default:
      return state;
  }
};

export default cartReducer;
