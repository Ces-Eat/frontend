import * as yup from "yup";

export interface ILocalization {
  label: string;
  latitude: number;
  longitude: number;
}

export interface IAddress {
  id?: string;
  designation?: string;
  address: ILocalization;
}

export const addressSchema = yup.object().shape({
  designation: yup.string().optional().max(60, "Maximum 60 caractères"),
  address: yup
    .object()
    .shape({
      label: yup.string().required().max(60, "Maximum 60 caractères"),
      longitude: yup.number().required(),
      latitude: yup.number().required(),
    })
    .nullable()
    .required("Adresse requise"),
});
