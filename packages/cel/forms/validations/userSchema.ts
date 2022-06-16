import * as yup from "yup";

const phoneRegExp = /^((\+33|0)[1-9])([0-9][0-9]){4}$/;

export interface IUser {
  img?: {};
  name: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
}

export const createUserSchema = yup.object().shape({
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
    .matches(phoneRegExp, 'Numéro de téléphone invalide')
    .max(15, "Maximum 15 caractères"),
  password: yup
    .string()
    .required("Mot de passe requis")
    .min(10, 'Minimim de 10 caractères')
    .max(50, "Maximum 50 caractères"),
});
