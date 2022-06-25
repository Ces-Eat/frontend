import { Button, Container } from "@mui/material";
import { IWallet, walletSchema } from "@ceseatslib/form";
import { Section } from "@ceseatslib/template";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import s from "@styles/WalletsNew.module.scss";
import { useState } from "react";
import Link from "next/link";
import WalletForm from "src/forms/WalletForm/WalletForm";

const WalletsPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<IWallet>({
    mode: "onChange",
    resolver: yupResolver(walletSchema),
  });

  const formSubmitHandler: SubmitHandler<IWallet> = (data) => {
    console.log(data);
    setIsLoading(true);
  };

  return (
    <Section title="Ajout d'une carte">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <WalletForm methods={methods} />
          <Container className={s.middleContainer}>
            <Link href="/wallets">
              <Button
                variant="contained"
                color="error"
                className={s.middleItem}
              >
                Retour
              </Button>
            </Link>
            <LoadingButton
              className={s.middleItem}
              type="submit"
              variant="contained"
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

export default WalletsPage;
