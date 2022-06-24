import React, { useState } from "react";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { IRestaurant, restaurantSchema } from "@ceseatslib/form";
import { Container } from "@mui/material";
import s from "styles/Restaurant.module.scss";
import RestaurantForm from "src/forms/RestaurantForm/RestaurantForm";

const Restaurant: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<IRestaurant>({
    mode: "onChange",
    resolver: yupResolver(restaurantSchema),
  });

  const formSubmitHandler: SubmitHandler<IRestaurant> = (data) => {
    console.log(data);
    setIsLoading(true);
  };
  const restaurant = null;

  return (
    <Section title="Mon compte">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <RestaurantForm methods={methods} />
          <Container className={s.btn_container}>
            <LoadingButton
              className={s.button}
              type="button"
              variant="contained"
              color={restaurant ? "error" : "success"}
              loading={isLoading}
            >
              {restaurant ? "Supprimer" : "Ajouter"}
            </LoadingButton>
          </Container>
        </form>
      </Container>
    </Section>
  );
};

export default Restaurant;
