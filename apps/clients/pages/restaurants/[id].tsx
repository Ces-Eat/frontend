// import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Typography,
} from "@mui/material";
import RestaurantHeader from "@components/restaurant/Header/Header";
import Category from "@components/restaurant/Category/Category";
import { ICartAction, useStore } from "src/utils/hooks";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import s from "styles/Restaurant.module.scss";
import CartSummary from "src/components/Cart";
import Link from "next/link";

const Restaurant = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, dispatchCart } = useStore();

  const restaurant = {
    title: "Burker king",
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    rating: 4.5,
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    articles: [
      {
        _id: "62bacad901a7fb8d33fabed8",
        name: "BARGUR",
        image: null,
        description: "A BARGUR",
        price: 12,
        isAvailable: true,
        restaurantId: "62bacabd01a7fb8d33fabed4",
        articleCategory: {
          _id: "62bacab501a7fb8d33fabeca",
          articleCategoryId: 2,
          name: "Accompagnement",
          createdAt: "2022-06-28T09:32:37.864Z",
          updatedAt: "2022-06-28T09:32:37.864Z",
          __v: 0,
        },
        deletedAt: null,
        createdAt: "2022-06-28T09:33:13.399Z",
        updatedAt: "2022-06-28T09:33:13.399Z",
        __v: 0,
      },
      {
        _id: "62bacad901a73fabed8",
        name: "BARGUR 2",
        image: null,
        description: "A BARGUR 2",
        price: 12,
        isAvailable: true,
        restaurantId: "62bacabd01a7fb8d33fabed4",
        articleCategory: {
          _id: "62bacab501a7fb8d33fabeca",
          articleCategoryId: 2,
          name: "Accompagnement",
          createdAt: "2022-06-28T09:32:37.864Z",
          updatedAt: "2022-06-28T09:32:37.864Z",
          __v: 0,
        },
        deletedAt: null,
        createdAt: "2022-06-28T09:33:13.399Z",
        updatedAt: "2022-06-28T09:33:13.399Z",
        __v: 0,
      },
      {
        _id: "6233fabed8",
        name: "BARGUR 3",
        image: null,
        description: "A BARGUR",
        price: 12,
        isAvailable: true,
        restaurantId: "62bacabd01a7fb8d33fabed4",
        articleCategory: {
          _id: "62bacab5013fabeca",
          articleCategoryId: 1,
          name: "Boisons",
          createdAt: "2022-06-28T09:32:37.864Z",
          updatedAt: "2022-06-28T09:32:37.864Z",
          __v: 0,
        },
        deletedAt: null,
        createdAt: "2022-06-28T09:33:13.399Z",
        updatedAt: "2022-06-28T09:33:13.399Z",
        __v: 0,
      },
    ],
    menus: [
      {
        _id: "62bacaf301a7fb8d33fabede",
        name: "BARGUR MENU",
        image: null,
        description: "A BARGUR MENU",
        price: 12,
        isAvailable: true,
        content: [
          {
            sectionName: "TEST SECTION",
            articles: [
              {
                _id: "62bacad901a7fb8d33fabed8",
                name: "BARGUR",
                image: null,
                description: "A BARGUR",
                price: 12,
                isAvailable: true,
                restaurantId: "62bacabd01a7fb8d33fabed4",
                articleCategory: {
                  _id: "62bacab501a7fb8d33fabeca",
                  articleCategoryId: 2,
                  name: "Accompagnement",
                  createdAt: "2022-06-28T09:32:37.864Z",
                  updatedAt: "2022-06-28T09:32:37.864Z",
                  __v: 0,
                },
                deletedAt: null,
                createdAt: "2022-06-28T09:33:13.399Z",
                updatedAt: "2022-06-28T09:33:13.399Z",
                __v: 0,
              },
            ],
          },
        ],
        restaurantId: "62bacabd01a7fb8d33fabed4",
        deletedAt: null,
        createdAt: "2022-06-28T09:33:39.059Z",
        updatedAt: "2022-06-28T09:33:39.059Z",
        __v: 0,
      },
    ],
  };

  const categories = restaurant.articles
    .map((article) => article.articleCategory)
    .filter((category, i, a) => a.indexOf(category));

  const articleCount = () => {
    let count = 0;
    cart[id].articles.forEach((article) => {
      count += article.quantity;
    });

    cart[id].menus.forEach((menu) => {
      count += menu.quantity;
    });
    return count;
  };

  const handleDeleteCart = () => {
    dispatchCart({ type: ICartAction.DELETE, payload: { id } });
    setIsCartOpen(false);
  };

  useEffect(() => {
    if (
      cart[id] &&
      cart[id].articles.length === 0 &&
      cart[id].menus.length === 0
    ) {
      setIsCartOpen(false);
    }
  }, [cart]);

  return (
    <>
      {cart[id] && (
        <Drawer
          anchor="right"
          onClose={() => setIsCartOpen(false)}
          open={isCartOpen}
        >
          <Box role="presentation" className={s.cart} component="div">
            <Typography className={s.cart_title} variant="h3">
              Panier
            </Typography>
            <Container className={s.cart_content}>
              <CartSummary
                summary={{
                  articles: cart[id].articles,
                  menus: cart[id].menus,
                }}
                price={cart[id].price}
                restaurantId={id}
                isEditable
              />
            </Container>
            <Container className={s.btn_container}>
              <Button
                className={s.pay}
                variant="outlined"
                color="error"
                onClick={handleDeleteCart}
              >
                Vider
              </Button>
              <Link href={`/restaurants/${id}/confirm`}>
                <Button className={s.pay} variant="outlined" color="success">
                  Voir le panier
                </Button>
              </Link>
            </Container>
          </Box>
        </Drawer>
      )}
      <Container className={s.container}>
        <RestaurantHeader
          img="/assets/default/defaultRestaurant.png"
          title={restaurant.title}
          desc={restaurant.desc}
        />
        <Container className={s.container}>
          {categories.map((category, i) => {
            const productCat = restaurant.articles.filter(
              (article) => article.articleCategory._id === category._id
            );
            return (
              <Fragment key={category._id}>
                {productCat.length !== 0 && i !== 0 && (
                  <Divider sx={{ width: "60%", margin: "20px auto" }} />
                )}
                <Category
                  {...category}
                  key={category._id}
                  products={productCat}
                  restaurantId={id}
                />
              </Fragment>
            );
          })}
          {restaurant.menus && restaurant.menus.length > 0 && (
            <>
              {restaurant.articles.length !== 0 && (
                <Divider sx={{ width: "60%", margin: "20px auto" }} />
              )}
              <Category
                key="menus"
                products={restaurant.menus}
                restaurantId={id}
                isMenu
              />
            </>
          )}
        </Container>
        {cart[id] &&
          (cart[id].articles.length > 0 || cart[id].menus.length > 0) && (
            <Button
              className={s.cart_btn}
              variant="contained"
              color="secondary"
              sx={{ color: "white" }}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCartIcon sx={{ marginRight: "10px" }} />
              <Typography sx={{ color: "white" }}>
                Panier ({articleCount()})
              </Typography>
            </Button>
          )}
      </Container>
    </>
  );
};

Restaurant.requireAuth = true;

export default Restaurant;
