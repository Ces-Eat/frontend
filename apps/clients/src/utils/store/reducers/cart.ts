/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
import { ICartAction } from "../action";

interface IArticle {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface IMenu {
  id: string;
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
    total: number;
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
        const articleIndex = articles.findIndex((a) => a.id === article!.id);

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
            total: state[id].total + article!.price,
          },
        };
      }
      return {
        ...state,
        [id]: {
          articles: [articleToAdd],
          menus: [],
          total: article!.price,
        },
      };

    case ICartAction.REMOVE_ARTICLE:
      if (state[id]) {
        const { articles } = state[id];
        const articleIndex = articles.findIndex((a) => a.id === article!.id);

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
              total: state[id].total - article!.price,
            },
          };
        }
      }
      return state;

    case ICartAction.ADD_MENU:
      const menuToAdd = { ...menu, quantity: 1 };

      if (state[id]) {
        const { menus } = state[id];
        const menuIndex = menus.findIndex(
          (m) =>
            m.id === payload.menu!.id && m.content === payload.menu!.content
        );

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
            total: state[id].total + payload.menu!.price,
          },
        };
      }
      return {
        ...state,
        [id]: {
          articles: [],
          menus: [menuToAdd],
          total: menu!.price,
        },
      };

    case ICartAction.REMOVE_MENU:
      if (state[id]) {
        const { menus } = state[id];
        const menuIndex = menus.findIndex(
          (m) =>
            m.id === payload.menu!.id && m.content === payload.menu!.content
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
              total: state[id].total - payload.menu!.price,
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
