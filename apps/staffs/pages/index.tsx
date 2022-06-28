import type { NextPage } from "next";
import Head from "next/head";
import s from "styles/Home.module.scss";
import {
  IRegistration,
  PrimaryTemplate,
  RegistrationTemplate,
} from "@ceseatslib/template";
import { Container } from "@mui/material";
import LoginForm from "src/forms/LoginForm/LoginForm";
import { useStore } from "src/utils/hooks";
import { useRouter } from "next/router";
import { useEffectOnce } from "@ceseatslib/utils";

const Home: NextPage = () => {
  const {
    auth: { isAuthenticated },
  } = useStore();
  const router = useRouter();

  useEffectOnce(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  });

  return (
    <div className={s.container}>
      <Head>
        <title>Clients</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className={s.loginContainer}>
        <PrimaryTemplate
          img={{ src: "/assets/loginImg.png", alt: "Image de connexion" }}
        >
          <RegistrationTemplate textType={IRegistration.LOGIN}>
            <LoginForm />
          </RegistrationTemplate>
        </PrimaryTemplate>
      </Container>
    </div>
  );
};

export default Home;
