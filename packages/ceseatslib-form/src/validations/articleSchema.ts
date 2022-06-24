import * as yup from "yup";

export interface IArticle {
  img: string | undefined;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

// img
export const articleSchema = yup.object().shape({
  name: yup.string().required().max(35, "Maximum 35 caractères"),
  description: yup.string().optional().max(500, "Maximum 500 caractères"),
  price: yup.number().required().min(0),
  isAvailable: yup.boolean().required(),
});
