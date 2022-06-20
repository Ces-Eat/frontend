import React, { useState } from "react";
import { Section } from "cel/ui";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import { AvatarInput, createUserSchema, IUser, TextInput } from "cel/forms";
import { Container } from "@mui/material";
import s from "@styles/Account.module.scss";

const Account: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<IUser>({
    mode: "onChange",
    resolver: yupResolver(createUserSchema),
  });

  const formSubmitHandler: SubmitHandler<IUser> = (data) => {
    console.log(data);
    setIsLoading(true);
  };
  return (
    <Section title="Mon compte">
      <Container className={s.container}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
            <AvatarInput name="img" img="/assets/Refered.png" />
            <TextInput name="name" label="Nom" />
            <TextInput name="surname" label="Prénom" />
            <TextInput name="email" type="email" label="Adresse mail" />
            <TextInput name="phone" label="Numéro de téléphone" />
            <TextInput name="password" type="password" label="Mot de passe" />
            <TextInput
              name="confirmPassword"
              type="password"
              label="Confirmation de mot de passe"
            />
            <LoadingButton
              className={s.button}
              type="submit"
              variant="contained"
              color="primary"
              loading={isLoading}
              disabled={!methods.formState.isValid}
            >
              Modifier
            </LoadingButton>
          </form>
        </FormProvider>
      </Container>
    </Section>
  );
};

export default Account;
