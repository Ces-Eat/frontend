import React, { useState } from "react";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { IArticle, IMenu, menuSchema } from "@ceseatslib/form";
import { Container, Button } from "@mui/material";
import Link from "next/link";
import s from "styles/Article.module.scss";
import MenuForm from "src/forms/MenuForm/MenuForm";

const products: IArticle[] = [
  {
    id: "1",
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    description: "2.4 €",
    name: "Berre Guère",
    price: 2.4,
    isAvailable: true,
  },
  {
    id: "2",
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    description: "2.4 €",
    name: "Berre Guère vB",
    price: 2.4,
    isAvailable: true,
  },
  {
    id: "3",
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    description: "2.4 €",
    name: "Berre Guère v3",
    price: 2.4,
    isAvailable: false,
  },
  {
    id: "4",
    image:
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    description: "2.4 €",
    name: "Berre Guère v4",
    price: 2.4,
    isAvailable: true,
  },
];

const NewMenu: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<IMenu>({
    mode: "onChange",
    resolver: yupResolver(menuSchema),
  });

  const formSubmitHandler: SubmitHandler<IMenu> = (data) => {
    console.log(data);
    setIsLoading(true);
  };

  return (
    <Section title="Menu">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <MenuForm methods={methods} articles={products} />
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

export default NewMenu;
