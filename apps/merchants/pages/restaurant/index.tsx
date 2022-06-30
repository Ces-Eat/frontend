import React, { useEffect, useState } from "react";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { IRestaurant, restaurantSchema } from "@ceseatslib/form";
import { Container } from "@mui/material";
import s from "styles/Restaurant.module.scss";
import RestaurantForm from "src/forms/RestaurantForm/RestaurantForm";
import { useStore } from "src/utils/hooks";
import axios from "axios";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import IRestaurantAction from "src/utils/store/action/restaurant";

const Restaurant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { restaurant, setRestaurant } = useStore();
  const { createNotification } = useNotificationCenter();

  const methods = useForm<IRestaurant>({
    mode: "onChange",
    resolver: yupResolver(restaurantSchema),
  });

  const formSubmitHandler: SubmitHandler<IRestaurant> = (formData) => {
    setIsLoading(true);
    if (restaurant.restaurant) {
      const formatData = {
        name: formData.name,
        description: formData.description,
        address: formData.address,
      };
      axios
        .put(`${process.env.API_RESTAURANT}/me`, formatData, {
          withCredentials: true,
        })
        .then(({ data }) => {
          setRestaurant({ type: IRestaurantAction.SET, payload: data });
          setIsLoading(false);
          createNotification(
            INotificationType.SUCCESS,
            "Modification avec succès"
          );
        })
        .catch(() => {
          createNotification(
            INotificationType.ERROR,
            "Impossible de modifier le restaurant"
          );
          setIsLoading(false);
        });
    } else {
      axios
        .post(`${process.env.API_RESTAURANT}/me`, formData, {
          withCredentials: true,
        })
        .then(({ data }) => {
          setRestaurant({ type: IRestaurantAction.SET, payload: data });
          createNotification(
            INotificationType.SUCCESS,
            "Restaurant ajouté avec succès"
          );
          setIsLoading(false);
        })
        .catch(() => {
          createNotification(
            INotificationType.ERROR,
            "Impossible d'ajouter le restaurant"
          );
          setIsLoading(false);
        });
    }
  };

  const handleDelete = () => {
    setIsLoading(true);
    axios
      .delete(`${process.env.API_RESTAURANT}/me`, { withCredentials: true })
      .then(() => {
        setRestaurant({ type: IRestaurantAction.DELETE, payload: null });
        methods.reset({ name: "", address: "", description: "" });
        createNotification(
          INotificationType.SUCCESS,
          "Restaurant supprimé avec succès"
        );
        setIsLoading(false);
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Impossible de supprimer le restaurant"
        );
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(restaurant);
  }, [restaurant]);

  return (
    <Section title="Mon restaurant">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <RestaurantForm
            methods={methods}
            restaurant={restaurant?.restaurant}
          />
          <Container className={s.btn_container}>
            {restaurant.restaurant ? (
              <LoadingButton
                className={s.button}
                type="button"
                onClick={handleDelete}
                variant="outlined"
                color="error"
                loading={isLoading}
              >
                Supprimer
              </LoadingButton>
            ) : (
              <LoadingButton
                className={s.button}
                type="submit"
                variant="outlined"
                color="success"
                loading={isLoading}
                disabled={!methods.formState.isValid}
              >
                Ajouter
              </LoadingButton>
            )}
            {restaurant.restaurant && (
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
