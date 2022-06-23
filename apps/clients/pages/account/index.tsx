import React, { useState } from "react";
import { Section } from "@ceseatslib/ui";
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
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <AvatarInput
            name="img"
            img="/assets/Refered.png"
            control={methods.control}
            watch={methods.watch}
            setValue={methods.setValue}
          />
          <TextInput name="name" label="Nom" control={methods.control} />
          <TextInput name="surname" label="Prénom" control={methods.control} />
          <TextInput
            name="email"
            type="email"
            label="Adresse mail"
            control={methods.control}
          />
          <TextInput
            name="phone"
            label="Numéro de téléphone"
            control={methods.control}
          />
          <TextInput
            name="password"
            type="password"
            label="Mot de passe"
            control={methods.control}
          />
          <TextInput
            name="confirmPassword"
            type="password"
            label="Confirmation de mot de passe"
            control={methods.control}
          />
          <Container className={s.btnContainer}>
            <LoadingButton
              className={s.button}
              type="submit"
              variant="contained"
              color="warning"
              loading={isLoading}
              disabled={!methods.formState.isValid}
            >
              Modifier
            </LoadingButton>
            <LoadingButton
              className={s.button}
              type="button"
              variant="contained"
              color="error"
              loading={isLoading}
            >
              Supprimer
            </LoadingButton>
          </Container>
        </form>
      </Container>
    </Section>
  );
};

export default Account;
