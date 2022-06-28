import React, { useState } from "react";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { articleSchema, IArticle } from "@ceseatslib/form";
import { Container, Button } from "@mui/material";
import Link from "next/link";
import s from "styles/Article.module.scss";
import ArticleForm from "src/forms/ArticleForm/ArticleForm";

const Article = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<IArticle>({
    mode: "onChange",
    resolver: yupResolver(articleSchema),
  });

  const formSubmitHandler: SubmitHandler<IArticle> = (data) => {
    console.log(data);
    setIsLoading(true);
  };

  const product = {
    id: "1",
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    description: "Super le produit",
    price: 2.4,
    name: "Berre Guère",
    articleCategoryId: "cat_eiheiqz",
    isAvailable: false,
  };

  const productCategory = [
    {
      id: "cat_eiheiqz",
      name: "Catégorie2",
    },
    {
      id: "cat_eiheiqz2",
      name: "Catégorie2",
    },
  ];

  return (
    <Section title="Article">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <ArticleForm
            methods={methods}
            product={product}
            category={productCategory.map((cat) => ({
              value: cat.id,
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
