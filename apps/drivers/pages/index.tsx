import type { NextPage } from "next";
import Head from "next/head";
import s from "styles/Home.module.scss";
import { useState } from "react";
import {
  IRegistration,
  PrimaryTemplate,
  RegistrationTemplate,
} from "@ceseatslib/template";
import { Container } from "@mui/material";
import LoginForm from "src/forms/LoginForm/LoginForm";
import RegisterForm from "src/forms/RegisterForm/RegisterForm";

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);

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
          <RegistrationTemplate
            textType={
              isLogin ? IRegistration.LOGIN : IRegistration.REGISTRATION
            }
            switchRegistration={() => setIsLogin(!isLogin)}
          >
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </RegistrationTemplate>
        </PrimaryTemplate>
      </Container>
    </div>
  );
};
export default Home;
