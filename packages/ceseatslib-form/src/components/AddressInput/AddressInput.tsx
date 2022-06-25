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

const AddressInput: React.FC<Props> = ({
  methods,
  name,
  label,
  required,
  defaultValue,
}) => {
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
          lat: feature.geometry.coordinates[1],
          long: feature.geometry.coordinates[0],
        }))
      );
    } else {
      setAddresses([]);
    }
  };

  return (
    <ComboBoxInput
      name={name}
      label={label}
      control={methods.control}
      onInputChange={handleInputChange}
      options={addresses}
      required={required}
      defaultValue={defaultValue}
    />
  );
};

AddressInput.defaultProps = {
  required: false,
  defaultValue: undefined,
};

export default AddressInput;
