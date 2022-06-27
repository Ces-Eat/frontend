import type { NextPage } from "next";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createUserSchema,
  IUser,
  MultiStep,
  TextInput,
  AvatarInput,
} from "@ceseatslib/form";
import axios from "axios";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import { IAuthAction, useStore } from "src/utils/hooks";
import { useRouter } from "next/router";

const RegisterForm: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createNotification } = useNotificationCenter();
  const { setAuth } = useStore();
  const router = useRouter();

  const methods = useForm<IUser>({
    mode: "onChange",
    resolver: yupResolver(createUserSchema),
  });

  const formSubmitHandler: SubmitHandler<IUser> = (formData) => {
    setIsLoading(true);
    const bodyFormData = new FormData();
    if (typeof formData.image !== "string")
      bodyFormData.append("image", formData.image[0]);
    if (formData.refererCode)
      bodyFormData.append("refererCode", formData.refererCode);
    bodyFormData.append("name", formData.name);
    bodyFormData.append("surname", formData.surname);
    bodyFormData.append("email", formData.email);
    bodyFormData.append("phone", formData.phone);
    bodyFormData.append("password", formData.password);

    axios({
      method: "post",
      withCredentials: true,
      url: `${process.env.API_USERS}/register/customer`,
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
        router.push("/restaurants");
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

  return (
    <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
      <MultiStep
        loading={isLoading}
        disabled={!methods.formState.isValid}
        buttonText="Inscription"
      >
        <>
          <AvatarInput
            name="image"
            img="/assets/default/defaultUser.png"
            control={methods.control}
            watch={methods.watch}
            setValue={methods.setValue}
            clear={methods.clearErrors}
          />
          <TextInput
            name="refererCode"
            label="Code de parrainage"
            control={methods.control}
            defaultValue=""
            fullWidth
          />
        </>
        <>
          <TextInput
            name="name"
            label="Nom"
            control={methods.control}
            defaultValue=""
            fullWidth
            required
          />
          <TextInput
            name="surname"
            label="Prénom"
            control={methods.control}
            defaultValue=""
            fullWidth
            required
          />
        </>
        <>
          <TextInput
            name="email"
            type="email"
            label="Adresse mail"
            control={methods.control}
            defaultValue=""
            fullWidth
            required
          />
          <TextInput
            name="phone"
            label="Numéro de téléphone"
            control={methods.control}
            defaultValue=""
            fullWidth
            required
          />
        </>
        <>
          <TextInput
            name="password"
            type="password"
            label="Mot de passe"
            control={methods.control}
            defaultValue=""
            fullWidth
            required
          />
          <TextInput
            name="confirmPassword"
            type="password"
            label="Confirmation de mot de passe"
            control={methods.control}
            defaultValue=""
            fullWidth
            required
          />
        </>
      </MultiStep>
    </form>
  );
};

export default RegisterForm;
