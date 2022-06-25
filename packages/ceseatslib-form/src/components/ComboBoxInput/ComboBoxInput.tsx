import React from "react";
import { useController, Control } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";

interface ComboBoxInputProps {
  name: string;
  label: string;
  control: Control<any, any>;
  defaultValue?: any;
  options: any[];
  required?: boolean;
  onChange?: (
    event: React.SyntheticEvent,
    value: any | Array<any>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any>
  ) => void;
  onInputChange?: (
    event: React.SyntheticEvent,
    value: any | Array<any>,
    reason: string,
    details?: string
  ) => void;
}

const ComboBoxInput: React.FC<ComboBoxInputProps> = ({
  name,
  label,
  defaultValue,
  control,
  options,
  onChange,
  onInputChange,
  ...textFieldProps
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Autocomplete
      {...field}
      value={field.value}
      onChange={(_, newValue) => field.onChange(newValue)}
      options={options}
      onInputChange={onInputChange}
      isOptionEqualToValue={() => true}
      renderInput={(params) => (
        <TextField
          {...{ ...params, ...textFieldProps }}
          label={label}
          variant="standard"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          fullWidth
        />
      )}
    />
  );
};

ComboBoxInput.defaultProps = {
  defaultValue: undefined,
  onChange: undefined,
  onInputChange: undefined,
  required: false,
};

export default ComboBoxInput;
