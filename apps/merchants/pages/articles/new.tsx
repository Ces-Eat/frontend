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

const NewArticle: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<IArticle>({
    mode: "onChange",
    resolver: yupResolver(articleSchema),
  });

  const formSubmitHandler: SubmitHandler<IArticle> = (data) => {
    console.log(data);
    setIsLoading(true);
  };

  return (
    <Section title="Article">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <ArticleForm methods={methods} />
          <Container className={s.btn_container}>
            <Link href="/articles">
              <Button variant="outlined" color="warning">
                Retour
              </Button>
            </Link>
            <LoadingButton
              type="button"
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

export default NewArticle;