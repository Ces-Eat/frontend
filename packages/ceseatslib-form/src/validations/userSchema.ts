import * as yup from "yup";
import SUPPORTED_IMG_FORMATS from "./imageSchema";

const phoneRegExp = /^((\+33|0)[1-9])([0-9][0-9]){4}$/;

export interface IUser {
  image: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}

export const createUserSchema = yup.object().shape({
  image: yup
    .mixed()
    .test(
      "type",
      "Format non valide",
      (value) =>
        typeof value === "string" ||
        (value[0] && SUPPORTED_IMG_FORMATS.includes(value[0].type))
    )
    .test(
      "fileSize",
      "Image trop grande",
      (value) =>
        typeof value === "string" || (value[0] && value[0].size <= 200000)
    ),
  name: yup.string().required("Prénom requis").max(35, "Maximum 35 caractères"),
  surname: yup.string().required("Nom requis").max(35, "Maximum 35 caractères"),
  email: yup
    .string()
    .email()
    .required("Adresse email requis")
    .max(320, "Maximum 35 caractères"),
  phone: yup
    .string()
    .required("Numéro de téléphone requis")
    .matches(phoneRegExp, "Numéro de téléphone invalide")
    .max(15, "Maximum 15 caractères"),
  password: yup
    .string()
    .required("Mot de passe requis")
    .min(10, "Minimim de 10 caractères")
    .max(50, "Maximum 50 caractères"),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Mot de passe différent"),
});

export interface ILogin {
  email: string;
  password: string;
}

export const loginUserSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Adresse email requis")
    .max(320, "Maximum 35 caractères"),
  password: yup
    .string()
    .required("Mot de passe requis")
    .min(10, "Minimim de 10 caractères")
    .max(50, "Maximum 50 caractères"),
});
