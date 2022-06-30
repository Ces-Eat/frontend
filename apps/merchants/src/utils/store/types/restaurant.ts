export interface IArticleCat {
  _id: string;
  articleCategoryId: number;
  name: string;
}

export interface IArticle {
  _id: string;
  name: string;
  image?: string | null;
  description?: string;
  price: number;
  isAvailable?: boolean;
  restaurantId: string;
  articleCategory: IArticleCat;
  deletedAt?: Date | null;
}

export interface IMenu {
  _id: string;
  name: string;
  image?: string | null;
  description?: string;
  price: number;
  isAvailable?: boolean;
  content?: [
    {
      sectionName: string;
      articles: IArticle[];
    }
  ];
  deletedAt?: Date | null;
}

export interface IRestaurant {
  _id: string;
  name: string;
  image?: string | null;
  description?: string;
  address: {
    label: string;
    longitude: number;
    latitude: number;
  };
  articles?: IArticle[];
  menus?: IMenu[];
  userId: string;
}
