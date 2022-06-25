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

const RegisterForm: NextPage = () => {
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
    <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
      <MultiStep
        loading={isLoading}
        disabled={!methods.formState.isValid}
        buttonText="Inscription"
      >
        <AvatarInput
          name="image"
          img="/assets/Refered.png"
          control={methods.control}
          watch={methods.watch}
          setValue={methods.setValue}
          clear={methods.clearErrors}
        />
        <>
          <TextInput
            name="name"
            label="Nom"
            control={methods.control}
            required
          />
          <TextInput
            name="surname"
            label="Prénom"
            control={methods.control}
            required
          />
        </>
        <>
          <TextInput
            name="email"
            type="email"
            label="Adresse mail"
            control={methods.control}
            required
          />
          <TextInput
            name="phone"
            label="Numéro de téléphone"
            control={methods.control}
            required
          />
        </>
        <>
          <TextInput
            name="password"
            type="password"
            label="Mot de passe"
            control={methods.control}
            required
          />
          <TextInput
            name="confirmPassword"
            type="password"
            label="Confirmation de mot de passe"
            control={methods.control}
            required
          />
        </>
      </MultiStep>
    </form>
  );
};

export default RegisterForm;
