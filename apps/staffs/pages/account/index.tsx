import React from "react";
import { Section } from "@ceseatslib/template";
import { Container, TextField } from "@mui/material";
import s from "styles/Account.module.scss";
import { useStore } from "src/utils/hooks";

const Account = () => {
  const {
    auth: { user },
  } = useStore();

  return (
    <Section title="Mon compte">
      <Container className={s.container}>
        <img
          src={
            user?.image
              ? `${process.env.API_USERS}/images/${user.image}`
              : "/assets/default/defaultUser.png"
          }
          crossOrigin="anonymous"
          alt="Avatar"
          className={s.img}
        />
        <TextField
          label="Nom"
          variant="standard"
          defaultValue={user?.name || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Prénom"
          variant="standard"
          defaultValue={user?.surname || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Adresse mail"
          variant="standard"
          defaultValue={user?.email || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />
        <TextField
          label="Numéro de téléphone"
          variant="standard"
          defaultValue={user?.phone || ""}
          InputProps={{ readOnly: true }}
          fullWidth
        />
      </Container>
    </Section>
  );
};

Account.requireAuth = true;

export default Account;
