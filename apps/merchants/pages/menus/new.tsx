import React, { useState } from "react";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { IMenu, menuSchema } from "@ceseatslib/form";
import { Container, Button } from "@mui/material";
import Link from "next/link";
import s from "styles/Article.module.scss";
import MenuForm from "src/forms/MenuForm/MenuForm";
import { useRouter } from "next/router";
import { useStore } from "src/utils/hooks";
import axios from "axios";
import IRestaurantAction from "src/utils/store/action/restaurant";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";

const NewMenu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createNotification } = useNotificationCenter();
  const router = useRouter();
  const {
    setRestaurant,
    restaurant: {
      restaurant: { articles },
    },
  } = useStore();

  const methods = useForm<IMenu>({
    mode: "onChange",
    resolver: yupResolver(menuSchema),
  });

  const formSubmitHandler: SubmitHandler<IMenu> = (data) => {
    setIsLoading(true);

    data.content = data.content.map((v) => ({
      ...v,
      articles: v.articles.map((article) => article._id),
    }));
    axios
      .post(`${process.env.API_RESTAURANT}/me/menus`, data, {
        withCredentials: true,
      })
      .then(({ data: menuData }) => {
        setRestaurant({
          type: IRestaurantAction.ADD_MENU,
          payload: menuData,
        });
        router.push("/menus");
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Impossible d'ajouter le menu"
        );
        setIsLoading(false);
      });
  };

  return (
    <Section title="Menu">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <MenuForm methods={methods} articles={articles} />
          <Container className={s.btn_container}>
            <Link href="/menus">
              <Button variant="outlined" color="warning">
                Retour
              </Button>
            </Link>
            <LoadingButton
              type="submit"
              variant="outlined"
              color="success"
              loading={isLoading}
              disabled={!methods.formState.isValid}
            >
              Ajouter
            </LoadingButton>
          </Container>
        </form>
      </Container>
    </Section>
  );
};

NewMenu.requireAuth = "restaurant";

export default NewMenu;
