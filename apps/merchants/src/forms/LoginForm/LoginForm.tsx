import type { NextPage } from "next";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin, loginUserSchema, TextInput } from "@ceseatslib/form";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import { IAuthAction, useStore } from "src/utils/hooks";
import { useRouter } from "next/router";

const LoginForm: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createNotification } = useNotificationCenter();
  const { setAuth } = useStore();
  const router = useRouter();

  const methods = useForm<ILogin>({
    mode: "onChange",
    resolver: yupResolver(loginUserSchema),
  });

  const formSubmitHandler: SubmitHandler<ILogin> = (formData) => {
    setIsLoading(true);

    axios
      .post(process.env.API_AUTH || "", formData, { withCredentials: true })
      .then(({ data }) => {
        switch (data.roleId) {
          case 1:
            createNotification(
              INotificationType.INFO,
              "Connectez-vous en tant que client ici http://localhost:4000/"
            );
            break;
          case 2:
            createNotification(
              INotificationType.INFO,
              "Connectez-vous en tant que livreur ici http://localhost:4001/"
            );
            break;
          case 4:
            createNotification(
              INotificationType.INFO,
              "Connectez-vous en tant que administrateur ici http://localhost:4003/"
            );
            break;
          default:
            setAuth({
              payload: data,
              type: IAuthAction.LOGIN,
            });
            router.push("/restaurant");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        switch (err.toJSON().status) {
          case 401:
            createNotification(
              INotificationType.ERROR,
              "Mot de passe ou email incorrect"
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
        name="password"
        type="password"
        label="Mot de passe"
        control={methods.control}
        defaultValue=""
        fullWidth
        required
      />
      <LoadingButton
        type="submit"
        variant="outlined"
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
