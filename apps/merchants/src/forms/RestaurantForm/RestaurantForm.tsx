import { AvatarInput, IRestaurant, TextInput } from "@ceseatslib/form";
import ComboBoxInput from "@ceseatslib/form/src/components/ComboBoxInput/ComboBoxInput";
import React, { useReducer } from "react";
import { UseFormReturn } from "react-hook-form";
import axios from "axios";

interface Props {
  methods: UseFormReturn<IRestaurant, any>;
  restaurant?: IRestaurant;
}

const RestaurantForm: React.FC<Props> = ({ methods, restaurant }) => {
  let cancelToken;

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_ADDRESS":
        return action.payload;
      case "RESET":
        return [];
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, [""]);

  const handleChange = async (e) => {
    const { value } = e.target;

    if (value) {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Operation canceled due to new request.");
      }

      //Save the cancel token for the current request
      cancelToken = axios.CancelToken.source();

      const res = await axios.get(
        `https://api-adresse.data.gouv.fr/search/?q=${value}&limit=10`,
        { cancelToken: cancelToken.token }
      );
      console.log(res.data.features);
      dispatch({
        type: "UPDATE_ADDRESS",
        payload: res.data.features.map((feature) => feature.properties.label),
      });
    } else {
      dispatch({
        type: "RESET",
      });
    }
  };

  return (
    <>
      <AvatarInput
        name="img"
        img={
          restaurant?.img
            ? restaurant.img
            : "/assets/default/defaultRestaurant.png"
        }
        control={methods.control}
        watch={methods.watch}
        setValue={methods.setValue}
      />
      <TextInput
        name="name"
        label="Nom"
        control={methods.control}
        defaultValue={restaurant?.name}
      />
      <TextInput
        name="description"
        label="Description"
        control={methods.control}
        defaultValue={restaurant?.description}
      />
      <ComboBoxInput
        name="address"
        label="Adresse"
        control={methods.control}
        onChange={handleChange}
        options={state}
      />
    </>
  );
};

RestaurantForm.defaultProps = {
  restaurant: undefined,
};

export default RestaurantForm;
