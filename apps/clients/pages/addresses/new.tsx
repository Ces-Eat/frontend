import { Button, Container } from "@mui/material";
import { addressSchema, IAddress } from "@ceseatslib/form";
import { Section } from "@ceseatslib/template";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import s from "@styles/WalletsNew.module.scss";
import { useState } from "react";
import Link from "next/link";
import AddressForm from "src/forms/AddressForm/AddressForm";

const AddressesPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<IAddress>({
    mode: "onChange",
    resolver: yupResolver(addressSchema),
  });

  const formSubmitHandler: SubmitHandler<IAddress> = (data) => {
    console.log(data);
    setIsLoading(true);
  };

  return (
    <Section title="Ajout d'une carte">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <AddressForm methods={methods} />
          <Container className={s.middleContainer}>
            <Link href="/addresses">
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

export default AddressesPage;
