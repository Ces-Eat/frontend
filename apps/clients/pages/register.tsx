import type { NextPage } from "next";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { RegistrationTemplate, IRegistration } from "cel/templates";
import { createUserSchema, IUser, MultiStep, TextInput } from "cel/forms";

const RegisterPage: NextPage = () => {
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
    <RegistrationTemplate
      textType={IRegistration.REGISTRATION}
      img={{ src: "/assets/loginImg.png", alt: "Image de connexion" }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <MultiStep
            loading={isLoading}
            disabled={!methods.formState.isValid}
            buttonText="Inscription"
          >
            <>
              <TextInput name="name" label="Nom" />
              <TextInput name="surname" label="Prénom" />
            </>
            <>
              <TextInput name="email" type="email" label="Adresse mail" />
              <TextInput name="phone" label="Numéro de téléphone" />
            </>
            <>
              <TextInput name="password" type="password" label="Mot de passe" />
              <TextInput
                name="confirmPassword"
                type="password"
                label="Confirmation de mot de passe"
              />
            </>
          </MultiStep>
        </form>
      </FormProvider>
    </RegistrationTemplate>
  );
};

export default RegisterPage;
