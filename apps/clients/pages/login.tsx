import type { NextPage } from "next";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Registration, IRegistration } from "@ceseatslib/template";
import { ILogin, loginUserSchema, TextInput } from "@ceseatslib/form";
import LoadingButton from "@mui/lab/LoadingButton";

const LoginPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ILogin>({
    mode: "onChange",
    resolver: yupResolver(loginUserSchema),
  });

  const formSubmitHandler: SubmitHandler<ILogin> = (data) => {
    console.log(data);
    setIsLoading(true);
  };

  return (
    <Registration
      textType={IRegistration.LOGIN}
      img={{ src: "/assets/loginImg.png", alt: "Image de connexion" }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <TextInput name="email" type="email" label="Adresse mail" />
          <TextInput name="password" type="password" label="Mot de passe" />
          <LoadingButton
            type="submit"
            variant="contained"
            color="primary"
            loading={isLoading}
            disabled={!methods.formState.isValid}
          >
            Connexion
          </LoadingButton>
        </form>
      </FormProvider>
    </Registration>
  );
};

export default LoginPage;
