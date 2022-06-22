import { Section, ActionCard } from "@ceseatslib/ui";
import { NextPage } from "next";
import CancelIcon from "@mui/icons-material/Cancel";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useState } from "react";
import Link from "next/link";
import { Button, Container } from "@mui/material";
import s from "@styles/Wallets.module.scss";

const AddressesPage: NextPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: "4564",
      name: "Maison",
      address: "14 rue hélène",
    },
    {
      id: "454",
      name: "Travail",
      address: "14 rue hélène",
    },
    {
      id: "44",
      name: "Espagne",
      address: "14 rue hélène",
    },
  ]);

  const handleDelete = (id: string) => {
    setAddresses((el) => el.filter((address) => address.id !== id));
  };

  return (
    <Section title="Wallets">
      <Container className={s.container}>
        {addresses.map(({ name, address, id }) => (
          <ActionCard
            key={id}
            img="/assets/Addresses.png"
            title={name}
            desc={address}
          >
            <Link href={`/addresses/${id}`}>
              <ModeEditIcon className={s.delete} color="warning" />
            </Link>
            <CancelIcon
              onClick={() => handleDelete(id)}
              className={s.delete}
              color="error"
            />
          </ActionCard>
        ))}
      </Container>
      <Link href="/addresses/new">
        <Button variant="contained" color="primary">
          Ajouter une adresse
        </Button>
      </Link>
    </Section>
  );
};

export default AddressesPage;
