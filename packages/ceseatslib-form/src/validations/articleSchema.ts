import * as yup from "yup";
import SUPPORTED_IMG_FORMATS from "./imageSchema";

export interface IArticle {
  image: string | HTMLImageElement;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

export const articleSchema = yup.object().shape({
  image: yup
    .mixed()
    .test(
      "type",
      "Format non valide",
      (value) => value[0] && SUPPORTED_IMG_FORMATS.includes(value[0].type)
    )
    .test(
      "fileSize",
      "Image trop grande",
      (value) => value[0] && value[0].size <= 200000
    ),
  name: yup.string().required("Nom requis").max(35, "Maximum 35 caractères"),
  description: yup.string().optional().max(500, "Maximum 500 caractères"),
  price: yup.number().required("Prix requis").min(0),
  isAvailable: yup.boolean().required(),
});
