import { Button, Container } from "@mui/material";
import { IWallet, Select, TextInput, walletSchema } from "@ceseatslib/form";
import { Section } from "@ceseatslib/ui";
import { NextPage } from "next";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import s from "@styles/WalletsNew.module.scss";
import { useState } from "react";
import Link from "next/link";

const WalletsPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const monthValue = Array(12)
    .fill(undefined)
    .map((_, i) => {
      const curValue = i + 1;
      const value = curValue < 10 ? `0${curValue}` : curValue;
      return { value, label: value };
    });

  const yearValue = Array(10)
    .fill(parseInt(new Date().getFullYear().toString().slice(-2), 10))
    .map((year, i) => {
      const curValue = year + i;
      const value = curValue < 10 ? `0${curValue}` : curValue;
      return { value, label: value };
    });

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
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
            <TextInput name="title" label="Nom de carte" />
            <Container className={s.cardContainer}>
              <TextInput
                className={s.card}
                name="cardNumber"
                label="Numéro de carte*"
              />
              <TextInput className={s.cvv} name="cvv" label="CVV*" />
            </Container>
            <Container className={s.middleContainer}>
              <Select
                className={s.middleItem}
                name="expirationMonth"
                label="Mois d'exp.*"
                chooses={monthValue}
              />
              <Select
                className={s.middleItem}
                name="expirationYear"
                label="Année d'exp.*"
                chooses={yearValue}
              />
            </Container>
            <TextInput name="designation" label="Désignation" />
            <Container className={s.middleContainer}>
              <Link href="/wallets">
                <Button
                  variant="contained"
                  color="error"
                  className={s.middleItem}
                >
                  {" "}
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
        </FormProvider>
      </Container>
    </Section>
  );
};

export default WalletsPage;
