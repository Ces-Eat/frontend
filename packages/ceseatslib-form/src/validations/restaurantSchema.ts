import * as yup from "yup";
import SUPPORTED_IMG_FORMATS from "./imageSchema";
import { IAddress } from "./addressSchema";

export interface IRestaurant {
  image: string;
  name: string;
  description: string;
  address: IAddress;
}

export const restaurantSchema = yup.object().shape({
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
  name: yup.string().required("Nom requis").max(35, "Maximum 35 caractères"),
  description: yup.string().optional().max(500, "Maximum 500 caractères"),
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
