import React, { useState } from "react";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  AvatarInput,
  createUserSchema,
  IUser,
  TextInput,
} from "@ceseatslib/form";
import { Container } from "@mui/material";
import s from "styles/Account.module.scss";
import { IAuthAction, useStore } from "src/utils/hooks";
import axios from "axios";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import { useRouter } from "next/router";

const Account = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createNotification } = useNotificationCenter();
  const router = useRouter();
  const {
    setAuth,
    auth: { user },
  } = useStore();

  const methods = useForm<IUser>({
    mode: "onChange",
    resolver: yupResolver(createUserSchema),
  });

  const formSubmitHandler: SubmitHandler<IUser> = (formData) => {
    setIsLoading(true);
    const bodyFormData = new FormData();
    if (typeof formData.image !== "string" || formData.image !== null) {
      bodyFormData.append("image", formData.image[0]);
    }
    bodyFormData.append("name", formData.name);
    bodyFormData.append("surname", formData.surname);
    bodyFormData.append("email", formData.email);
    bodyFormData.append("phone", formData.phone);
    bodyFormData.append("password", formData.password);

    axios({
      method: "put",
      withCredentials: true,
      url: `${process.env.API_USERS}/me`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data }) => {
        setAuth({
          payload: data,
          type: IAuthAction.LOGIN,
        });
        methods.reset(data);
        setIsLoading(false);
      })
      .catch((err) => {
        switch (err.toJSON().status) {
          case 400:
            createNotification(
              INotificationType.ERROR,
              "Email ou téléphone déjà utilisé"
            );
            break;
          default:
            createNotification(
              INotificationType.ERROR,
              "Erreur, veuillez réessayer plus tard"
            );
            break;
        }
        setIsLoading(false);
      });
  };

  const handleDelete = () => {
    setIsLoading(true);

    axios
      .delete(`${process.env.API_USERS}/me`, { withCredentials: true })
      .then(() => {
        setAuth({
          payload: null,
          type: IAuthAction.LOGOUT,
        });
        router.push("/");
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
        setIsLoading(false);
      });
  };
  return (
    <Section title="Mon compte">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <AvatarInput
            name="image"
            img={
              user?.image
                ? `${process.env.API_USERS}/images/${user.image}`
                : "/assets/default/defaultUser.png"
            }
            control={methods.control}
            watch={methods.watch}
            setValue={methods.setValue}
            clear={methods.clearErrors}
          />
          <TextInput
            name="name"
            label="Nom"
            control={methods.control}
            defaultValue={user?.name || ""}
            fullWidth
          />
          <TextInput
            name="surname"
            label="Prénom"
            control={methods.control}
            defaultValue={user?.surname || ""}
            fullWidth
          />
          <TextInput
            name="email"
            type="email"
            label="Adresse mail"
            control={methods.control}
            defaultValue={user?.email || ""}
            fullWidth
          />
          <TextInput
            name="phone"
            label="Numéro de téléphone"
            control={methods.control}
            defaultValue={user?.phone || ""}
            fullWidth
          />
          <TextInput
            name="password"
            type="password"
            label="Mot de passe"
            control={methods.control}
            defaultValue=""
            fullWidth
          />
          <TextInput
            name="confirmPassword"
            type="password"
            label="Confirmation de mot de passe"
            control={methods.control}
            defaultValue=""
            fullWidth
          />
          <Container className={s.btnContainer}>
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
            <LoadingButton
              className={s.button}
              type="button"
              variant="outlined"
              color="error"
              loading={isLoading}
              onClick={handleDelete}
            >
              Supprimer
            </LoadingButton>
          </Container>
        </form>
      </Container>
    </Section>
  );
};

Account.requireAuth = true;

export default Account;