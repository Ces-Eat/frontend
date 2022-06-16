import type { NextPage } from "next";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from '@mui/material';
import { LoginTemplate } from "cel/templates";
import { createUserSchema, IUser, TextInput } from "cel/forms";

const LoginPage: NextPage = () => {
  const methods = useForm<IUser>({
    resolver: yupResolver(createUserSchema),
  });

  const formSubmitHandler: SubmitHandler<IUser> = (data) => {
   console.log(data);
  };
  
  return (
    <LoginTemplate
      img={{ src: "/assets/loginImg.png", alt: "Image de connexion" }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <TextInput name="surname" label="Nom" />
          <TextInput name="name" label="Prénom" />
          <TextInput name="email" label="Adresse email" type="email" />
          <TextInput name="phone" label="Numéro de téléphone" />
          <TextInput name="password" label="Mot de passe" />
          <Button type='submit'>Register</Button>
        </form>
      </FormProvider>
    </LoginTemplate>
  );
};

export default LoginPage;
