import type { NextPage } from "next";
import { LoginTemplate } from "cel/templates";

const LoginPage: NextPage = () => (
  <LoginTemplate
    img={{ src: "/assets/loginImg.png", alt: "Image de connexion" }}
  >
    <div>Formulaire</div>
  </LoginTemplate>
);

export default LoginPage;
