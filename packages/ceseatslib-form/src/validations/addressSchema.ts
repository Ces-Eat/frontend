import * as yup from "yup";

export interface ILocalization {
  label: string;
  lat: number;
  long: number;
}

export interface IAddress {
  designation?: string;
  address: ILocalization;
}

export const addressSchema = yup.object().shape({
  designation: yup.string().optional().max(60, "Maximum 60 caractères"),
  address: yup
    .object()
    .shape({
      label: yup.string().required().max(60, "Maximum 60 caractères"),
      long: yup.number().required(),
      lat: yup.number().required(),
    })
    .nullable()
    .required("Adresse requise"),
});
