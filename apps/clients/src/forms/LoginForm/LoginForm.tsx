import type { NextPage } from "next";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin, loginUserSchema, TextInput } from "@ceseatslib/form";
import LoadingButton from "@mui/lab/LoadingButton";

const LoginForm: NextPage = () => {
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
    <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
      <TextInput
        name="email"
        type="email"
        label="Adresse mail"
        control={methods.control}
        required
      />
      <TextInput
        name="password"
        type="password"
        label="Mot de passe"
        control={methods.control}
        required
      />
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
  );
};

export default LoginForm;
