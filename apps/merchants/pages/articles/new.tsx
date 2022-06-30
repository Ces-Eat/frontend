import React, { useState, useEffect } from "react";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { articleSchema, IArticle } from "@ceseatslib/form";
import { Container, Button } from "@mui/material";
import Link from "next/link";
import s from "styles/Article.module.scss";
import ArticleForm from "src/forms/ArticleForm/ArticleForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useStore } from "src/utils/hooks";
import IRestaurantAction from "src/utils/store/action/restaurant";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";

const NewArticle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { createNotification } = useNotificationCenter();
  const { setRestaurant } = useStore();
  const router = useRouter();

  const methods = useForm<IArticle>({
    mode: "onChange",
    resolver: yupResolver(articleSchema),
  });

  const formSubmitHandler: SubmitHandler<IArticle> = (data) => {
    setIsLoading(true);
    axios
      .post(`${process.env.API_RESTAURANT}/me/articles`, data, {
        withCredentials: true,
      })
      .then(({ data: articleData }) => {
        setRestaurant({
          type: IRestaurantAction.ADD_ARTICLE,
          payload: articleData,
        });
        router.push("/articles");
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Impossible d'ajouter l'article"
        );
        setIsLoading(false);
      });
  };

  useEffect(() => {
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
            category={categories.map((cat) => ({
              value: cat._id,
              label: cat.name,
            }))}
          />
          <Container className={s.btn_container}>
            <Link href="/articles">
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

NewArticle.requireAuth = "restaurant";

export default NewArticle;
