import * as yup from "yup";
import { articleSchema } from "./articleSchema";
import SUPPORTED_IMG_FORMATS from "./imageSchema";

export interface IMenuContent {
  sectionName: string;
  articles: string[];
}

export interface IMenu {
  id?: string;
  image: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  content: IMenuContent[];
}

export const menuSchema = yup.object().shape({
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
  price: yup.number().required("Prix requis").min(0),
  isAvailable: yup.boolean().required(),
  content: yup
    .array()
    .test(
      "required",
      "Au moins une section requise",
      (value) => value?.length !== 0
    )
    .of(
      yup.object().shape({
        sectionName: yup.string().required("Nom de la section requis"),
        articles: yup
          .array(articleSchema)
          .test(
            "required",
            "Au moins un article requis",
            (value) => value?.length !== 0
          ),
      })
    ),
});
