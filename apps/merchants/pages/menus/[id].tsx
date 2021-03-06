import React, { useEffect, useState } from "react";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { IMenu, menuSchema } from "@ceseatslib/form";
import { Container, Button } from "@mui/material";
import Link from "next/link";
import s from "styles/Article.module.scss";
import MenuForm from "src/forms/MenuForm/MenuForm";
import { useStore } from "src/utils/hooks";
import { useRouter } from "next/router";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import IRestaurantAction from "src/utils/store/action/restaurant";
import axios from "axios";
import Head from "next/head";

const Menu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createNotification } = useNotificationCenter();
  const router = useRouter();
  const { id } = router.query;
  const {
    restaurant: {
      restaurant: { articles, menus },
    },
    setRestaurant,
  } = useStore();

  const methods = useForm<IMenu>({
    mode: "onChange",
    resolver: yupResolver(menuSchema),
  });

  const formSubmitHandler: SubmitHandler<IMenu> = (data) => {
    setIsLoading(true);
    data.content = data.content.map((c) => ({
      ...c,
      articles: c.articles.map((a) => a._id),
    }));
    axios
      .put(`${process.env.API_RESTAURANT}/me/menus/${id}`, data, {
        withCredentials: true,
      })
      .then(({ data: menuData }) => {
        setRestaurant({
          type: IRestaurantAction.UPDATE_MENU,
          payload: menuData,
        });
        router.push("/menus");
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Impossible de modifier le menu"
        );
        setIsLoading(false);
      });
  };

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`${process.env.API_RESTAURANT}/me/menus/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setRestaurant({
          type: IRestaurantAction.DELETE_MENU,
          payload: id,
        });
        router.push("/menus");
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Impossible de supprimer le menu"
        );
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (menus.findIndex((menu) => menu._id === id) === -1) {
      router.push("/menus");
    }
  }, [menus]);

  return (
    <>
      <Head>
        <title>
          Restaurateur - Menu {menus.find((menu) => menu._id === id).name}
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section title="Menu">
        <Container className={s.container}>
          <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
            <MenuForm
              methods={methods}
              menu={menus.find((menu) => menu._id === id)}
              articles={articles}
            />
            <Container className={s.btn_container}>
              <LoadingButton
                type="submit"
                variant="outlined"
                color="warning"
                loading={isLoading}
                disabled={!methods.formState.isValid}
              >
                Modifier
              </LoadingButton>
              <LoadingButton
                type="button"
                variant="outlined"
                color="error"
                loading={isLoading}
                onClick={handleDelete}
              >
                Supprimer
              </LoadingButton>
            </Container>
            <Link href="/menus">
              <Button variant="outlined" className={s.btn_back}>
                Retour
              </Button>
            </Link>
          </form>
        </Container>
      </Section>
    </>
  );
};

Menu.requireAuth = "restaurant";

export default Menu;
