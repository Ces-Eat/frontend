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
import axios from "axios";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import { LoadingPage } from "@ceseatslib/template";
import Head from "next/head";

const Restaurant = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, dispatchCart } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const { createNotification } = useNotificationCenter();

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

  useEffect(() => {
    axios
      .get(`${process.env.API_RESTAURANT}/${id}`)
      .then(({ data }) => {
        setRestaurant(data);
        let cat = data.articles
          .map((article) => article.articleCategory)
          .filter((category, i, a) => a.indexOf(category));

        if (cat.length === 0 && data.articles.length > 0) {
          cat = [data.articles[0].articleCategory];
        }

        setCategories(cat);
        setIsLoading(false);
      })
      .catch((err) => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
        router.push("/restaurants");
      });
  }, []);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>Clients - {restaurant.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          title={restaurant.name}
          desc={restaurant.description}
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
