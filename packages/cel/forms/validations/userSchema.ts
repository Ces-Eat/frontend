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

//  yup.object().shape(loginUserSchema.fields);
//  const t= loginUserSchema.concat(createUserSchema, )
//  const a = [1, 5], b = [44, 67, 3], c = [2, 5], d = [7], e = [4], f = [3,
//   7], g = [6];
//   const concatArrays = (...arr) => {
//      const res = arr.reduce((acc, val) => {
//         return acc.concat(...val);
//      }, []);
//      return res;
//   };
//   console.log(concatArrays(a, b, c, d, e, f, g));
