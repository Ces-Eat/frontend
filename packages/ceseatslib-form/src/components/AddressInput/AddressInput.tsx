import axios, { CancelTokenSource } from "axios";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ILocalization } from "../../validations";
import { ComboBoxInput } from "../ComboBoxInput";
import { ApiGouvSearchResponse } from "./AddressInput.type";

interface Props {
  methods: UseFormReturn<any, any>;
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: ILocalization;
}

const AddressInput: React.FC<Props> = ({ methods, ...textFieldProps }) => {
  const [addresses, setAddresses] = useState<ILocalization[]>([]);
  let cancelToken: CancelTokenSource | undefined;

  const handleInputChange = async (
    _: React.SyntheticEvent<Element, Event>,
    value: any | Array<any>,
    reason: string
  ) => {
    if (reason === "input" && value.length > 2) {
      cancelToken?.cancel();
      cancelToken = axios.CancelToken.source();
      const response = await axios.get<ApiGouvSearchResponse>(
        `https://api-adresse.data.gouv.fr/search/?q=${value}&limit=10`,
        {
          cancelToken: cancelToken.token,
        }
      );
      setAddresses(
        response.data.features.map((feature) => ({
          label: feature.properties.label,
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
        }))
      );
    } else {
      setAddresses([]);
    }
  };

  return (
    <ComboBoxInput
      options={addresses}
      control={methods.control}
      getOptionLabel={(option) => (option.label ? option.label : "")}
      onInputChange={handleInputChange}
      {...textFieldProps}
    />
  );
};

AddressInput.defaultProps = {
  required: false,
  defaultValue: undefined,
};

export default AddressInput;
