import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { Control, useController } from "react-hook-form";

interface ComboBoxInputProps {
  options: any[];
  label: string;
  name: string;
  control: Control<any, any>;
  defaultValue?: any;
  multiple?: boolean;
  getOptionLabel?: (option: any) => string;
  onInputChange?: (
    event: React.SyntheticEvent,
    value: any | Array<any>,
    reason: string,
    details?: string
  ) => void;
}

const ComboBoxInput: React.FC<ComboBoxInputProps> = ({
  options,
  label,
  name,
  control,
  defaultValue,
  ...textFieldProps
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Autocomplete
      {...textFieldProps}
      {...field}
      value={field.value}
      onChange={(_, newValue) => field.onChange(newValue)}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

ComboBoxInput.defaultProps = {
  getOptionLabel: (option) => option,
  multiple: false,
  defaultValue: [],
  onInputChange: undefined,
};

export default ComboBoxInput;
