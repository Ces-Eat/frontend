import { IWallet, Select, TextInput } from "@ceseatslib/form";
import { Container } from "@mui/material";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import s from "@styles/WalletsNew.module.scss";

interface Props {
  methods: UseFormReturn<IWallet, any>;
}

const WalletForm: React.FC<Props> = ({ methods }) => {
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
  return (
    <>
      <TextInput name="title" label="Nom de carte" control={methods.control} />
      <Container className={s.cardContainer}>
        <TextInput
          className={s.card}
          name="cardNumber"
          label="Numéro de carte*"
          control={methods.control}
        />
        <TextInput
          className={s.cvv}
          name="cvv"
          label="CVV*"
          control={methods.control}
        />
      </Container>
      <Container className={s.middleContainer}>
        <Select
          className={s.middleItem}
          name="expirationMonth"
          label="Mois d'exp.*"
          chooses={monthValue}
          control={methods.control}
        />
        <Select
          className={s.middleItem}
          name="expirationYear"
          label="Année d'exp.*"
          chooses={yearValue}
          control={methods.control}
        />
      </Container>
      <TextInput
        name="designation"
        label="Désignation"
        control={methods.control}
      />
    </>
  );
};

export default WalletForm;
