import * as yup from "yup";

export interface IWallet {
  title: string;
  cardNumber: string;
  expirationMonth: string;
  expirationYear: string;
  cvv: string;
  designation: string;
}

const startYear = new Date().getFullYear().toString().slice(-2);
const endYear = (parseInt(startYear, 10) + 10).toString();

const numberRex = /\d+/g;
const monthRegex = /^(0[1-9]|1[012])$/;
const yearRegex = new RegExp(
  `^(${startYear[0]}[${startYear[1]}-9]|${endYear[0]}[0-${endYear[1]}])$`
);

export const walletSchema = yup.object().shape({
  title: yup.string().optional().max(35, "Maximum 35 caractères"),
  cardNumber: yup
    .string()
    .required("Numéro de carte requis")
    .matches(numberRex, "Numéro de carte invalide")
    .min(16, "16 caractères nécéssaire")
    .max(16, "16 caractères nécéssaire"),
  expirationMonth: yup
    .string()
    .required("Mois d'expiration requis")
    .matches(monthRegex, "Mois d'expiration invalide")
    .max(2, "Maximum 2 caractères"),
  expirationYear: yup
    .string()
    .required("Année d'expiration requis")
    .matches(yearRegex, "Année d'expiration invalide")
    .max(2, "Maximum 2 caractères"),
  cvv: yup
    .string()
    .required("CVV requis")
    .matches(numberRex, "CVV invalide")
    .min(3, "3 caractères nécéssaire")
    .max(3, "3 caractères nécéssaire"),
  designation: yup.string().optional().max(70, "Maximum 70 caractères"),
});
