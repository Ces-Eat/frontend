import { Button, Container } from "@mui/material";
import { addressSchema, IAddress } from "@ceseatslib/form";
import { LoadingPage, Section } from "@ceseatslib/template";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from "@mui/lab/LoadingButton";
import s from "styles/WalletsNew.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import AddressForm from "src/forms/AddressForm/AddressForm";
import { INotificationType, useNotificationCenter } from "@ceseatslib/utils";
import axios from "axios";
import { useRouter } from "next/router";

const AddressePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [address, setAddress] = useState(undefined);
  const { createNotification } = useNotificationCenter();
  const router = useRouter();

  const methods = useForm<IAddress>({
    mode: "onChange",
    resolver: yupResolver(addressSchema),
  });

  useEffect(() => {
    const { id } = router.query;
    axios
      .get(`${process.env.API_ADDRESS}/${id}`, { withCredentials: true })
      .then(({ data }) => {
        setAddress({
          // @ts-ignore
          designation: data.designation,
          address: {
            latitude: data.latitude,
            longitude: data.longitude,
            label: data.label,
          },
        });
        setIsLoadingData(false);
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
        router.push("/addresses");
      });
  }, []);

  const formSubmitHandler: SubmitHandler<IAddress> = (formData) => {
    setIsLoading(true);
    const { id } = router.query;
    const refactorFormData = {
      designation: formData.designation,
      ...formData.address,
    };

    axios
      .put(`${process.env.API_ADDRESS}/${id}`, refactorFormData, {
        withCredentials: true,
      })
      .then(() => {
        createNotification(
          INotificationType.SUCCESS,
          "Adresse modifié avec succès"
        );
        router.push("/addresses");
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
        setIsLoading(false);
      });
  };

  if (isLoadingData) return <LoadingPage />;

  return (
    <Section title="Modification d'une carte">
      <Container className={s.container}>
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <AddressForm methods={methods} address={address} />
          <Container className={s.middleContainer}>
            <Link href="/addresses">
              <Button variant="outlined" color="error" className={s.middleItem}>
                Retour
              </Button>
            </Link>
            <LoadingButton
              className={s.middleItem}
              type="submit"
              variant="outlined"
              color="warning"
              loading={isLoading}
              disabled={!methods.formState.isValid}
            >
              Modifier
            </LoadingButton>
          </Container>
        </form>
      </Container>
    </Section>
  );
};

AddressePage.requireAuth = true;

export default AddressePage;
