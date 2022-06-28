import { Button, Container } from "@mui/material";
import { IWallet, walletSchema } from "@ceseatslib/form";
import { Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import s from "styles/WalletsNew.module.scss";
import { useState } from "react";
import Link from "next/link";
import WalletForm from "src/forms/WalletForm/WalletForm";
import axios from "axios";
import { useRouter } from "next/router";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";

const NewWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createNotification } = useNotificationCenter();
  const router = useRouter();

  const methods = useForm<IWallet>({
    mode: "onChange",
    resolver: yupResolver(walletSchema),
  });

  const formSubmitHandler: SubmitHandler<IWallet> = (formData) => {
    setIsLoading(true);

    // @ts-ignore
    // eslint-disable-next-line
    if (formData.cvv) delete formData.cvv;

    axios
      .post(`${process.env.API_WALLET}`, formData, { withCredentials: true })
      .then(() => {
        createNotification(
          INotificationType.SUCCESS,
          "Carte ajouté avec succès"
        );
        router.push("/wallets");
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
    <Section title="Ajout d'une carte">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <WalletForm methods={methods} />
          <Container className={s.middleContainer}>
            <Link href="/wallets">
              <Button variant="outlined" color="error" className={s.middleItem}>
                Retour
              </Button>
            </Link>
            <LoadingButton
              className={s.middleItem}
              type="submit"
              variant="outlined"
              color="primary"
              loading={isLoading}
              disabled={!methods.formState.isValid}
            >
              Ajouter
            </LoadingButton>
          </Container>
        </form>
      </Container>
    </Section>
  );
};

NewWallet.requireAuth = true;

export default NewWallet;
