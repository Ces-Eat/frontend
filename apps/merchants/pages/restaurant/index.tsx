import React, { useState } from "react";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { IRestaurant, restaurantSchema } from "@ceseatslib/form";
import { Container } from "@mui/material";
import s from "styles/Restaurant.module.scss";
import RestaurantForm from "src/forms/RestaurantForm/RestaurantForm";
import { useStore } from "src/utils/hooks";

const Restaurant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsRestaurant } = useStore();

  const methods = useForm<IRestaurant>({
    mode: "onChange",
    resolver: yupResolver(restaurantSchema),
  });

  const formSubmitHandler: SubmitHandler<IRestaurant> = (data) => {
    console.log(data);
    setIsRestaurant(true);
    setIsLoading(true);
  };
  const restaurant = null;

  return (
    <Section title="Mon restaurant">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <RestaurantForm methods={methods} />
          <Container className={s.btn_container}>
            <LoadingButton
              className={s.button}
              type="submit"
              variant="outlined"
              color={restaurant ? "error" : "success"}
              loading={isLoading}
              disabled={!methods.formState.isValid}
            >
              {restaurant ? "Supprimer" : "Ajouter"}
            </LoadingButton>

            {restaurant && (
              <LoadingButton
                className={s.button}
                type="submit"
                variant="outlined"
                color="warning"
                loading={isLoading}
                disabled={!methods.formState.isValid}
              >
                Modifier
              </LoadingButton>
            )}
          </Container>
        </form>
      </Container>
    </Section>
  );
};

Restaurant.requireAuth = true;

export default Restaurant;
