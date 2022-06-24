import * as yup from "yup";

export interface IRestaurant {
  img: {} | string | undefined;
  name: string;
  description: string;
}

// img
// address
export const restaurantSchema = yup.object().shape({
  name: yup.string().required().max(35, "Maximum 35 caractères"),
  description: yup.string().optional().max(500, "Maximum 500 caractères"),
});
