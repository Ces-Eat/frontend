import { ActionCard } from "@ceseatslib/ui";
import { LoadingPage, Section } from "@ceseatslib/template";
import ClearIcon from "@mui/icons-material/Clear";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";
import Link from "next/link";
import { Button, Container } from "@mui/material";
import s from "@styles/Wallets.module.scss";
import {
  INotificationType,
  useEffectOnce,
  useNotificationCenter,
} from "@ceseatslib/utils";
import axios from "axios";

interface IAddress {
  id: string;
  designation?: string;
  label: string;
  latitude: number;
  longitude: number;
}

const AddressesPage = () => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const { createNotification } = useNotificationCenter();

  useEffectOnce(() => {
    axios
      .get(`${process.env.API_ADDRESS}`, { withCredentials: true })
      .then(({ data }) => {
        setAddresses(data);
        setIsLoadingData(false);
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
        setIsLoadingData(false);
      });
  });

  const handleDelete = (id: string) => {
    axios
      .delete(`${process.env.API_ADDRESS}/${id}`, { withCredentials: true })
      .then(() => {
        setAddresses((el) => el.filter((address) => address.id !== id));
        createNotification(
          INotificationType.SUCCESS,
          "Adresse supprimé avec succès"
        );
      })
      .catch(() => {
        createNotification(
          INotificationType.ERROR,
          "Erreur, veuillez réessayer plus tard"
        );
      });
  };

  if (isLoadingData) return <LoadingPage />;

  return (
    <Section title="Adresses">
      <Container className={s.container}>
        {addresses.map(({ label, designation, id }) => (
          <ActionCard
            key={id}
            img="/assets/Addresses.png"
            title={designation || ""}
            desc={label}
          >
            <Link href={`/addresses/${id}`}>
              <ModeEditIcon className={s.delete} color="warning" />
            </Link>
            <ClearIcon
              onClick={() => handleDelete(id)}
              className={s.delete}
              color="error"
              sx={{ fontSize: "30px" }}
            />
          </ActionCard>
        ))}
      </Container>
      <Link href="/addresses/new">
        <Button variant="outlined" color="primary">
          Ajouter une adresse
        </Button>
      </Link>
    </Section>
  );
};

AddressesPage.requireAuth = true;

export default AddressesPage;
