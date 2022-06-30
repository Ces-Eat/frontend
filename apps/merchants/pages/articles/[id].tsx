import React, { useEffect, useState } from "react";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { articleSchema, IArticle } from "@ceseatslib/form";
import { Container, Button } from "@mui/material";
import Link from "next/link";
import s from "styles/Article.module.scss";
import ArticleForm from "src/forms/ArticleForm/ArticleForm";
import { useRouter } from "next/router";
import axios from "axios";
import { useStore } from "src/utils/hooks";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import IRestaurantAction from "src/utils/store/action/restaurant";

const Article = () => {
  const router = useRouter();
  const { id } = router.query;
  const { createNotification } = useNotificationCenter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const {
    setRestaurant,
    restaurant: {
      restaurant: { articles, menus },
    },
  } = useStore();

  const methods = useForm<IArticle>({
    mode: "onChange",
    resolver: yupResolver(articleSchema),
  });

  const formSubmitHandler: SubmitHandler<IArticle> = (data) => {
    setIsLoading(true);
    axios
      .put(`${process.env.API_RESTAURANT}/me/articles/${id}`, data, {
        withCredentials: true,
      })
      .then(({ data: articleData }) => {
        setRestaurant({
          type: IRestaurantAction.UPDATE_ARTICLE,
          payload: articleData,
        });
        router.push("/articles");
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Impossible de modifier l'article"
        );
        setIsLoading(false);
      });
  };

  const handleDelete = () => {
    if (
      menus.length > 0 &&
      menus.find((menu) =>
        menu.content.find((c) =>
          c.articles.find((article) => article._id === id)
        )
      )
    ) {
      createNotification(
        INotificationType.ERROR,
        "Impossible de supprimer l'article car il est utilisé dans un menu"
      );
      return;
    }
    setIsLoading(true);
    axios
      .delete(`${process.env.API_RESTAURANT}/me/articles/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setRestaurant({
          type: IRestaurantAction.DELETE_ARTICLE,
          payload: id,
        });
        router.push("/articles");
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Impossible de supprimer l'article"
        );
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (articles.findIndex((article) => article._id === id) === -1) {
      router.push("/articles");
    }
    axios
      .get(`${process.env.API_RESTAURANT}/articles/categories`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        setCategories(data);
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Impossible d'obtenir les catégories d'articles"
        );
      });
  }, []);

  return (
    <Section title="Article">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <ArticleForm
            methods={methods}
            product={articles.find((article) => article._id === id)}
            category={categories.map((cat) => ({
              value: cat._id,
              label: cat.name,
            }))}
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
          <Link href="/articles">
            <Button variant="outlined" className={s.btn_back}>
              Retour
            </Button>
          </Link>
        </form>
      </Container>
    </Section>
  );
};

Article.requireAuth = "restaurant";

export default Article;
