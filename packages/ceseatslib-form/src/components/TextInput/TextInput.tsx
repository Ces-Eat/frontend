import React from "react";
import { useController, Control } from "react-hook-form";
import { TextField } from "@mui/material";

interface TextInputProps {
  name: string;
  label: string;
  control: Control<any, any>;
  defaultValue?: string | number;
  className?: string;
  type?: string;
  multiline?: boolean;
  inputProps?: any;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  defaultValue,
  inputProps,
  className,
  control,
  ...textFieldProps
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <TextField
      {...{ ...field, ...textFieldProps }}
      className={className}
      label={label}
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      fullWidth
      InputProps={{ ...inputProps, style: { fontSize: 18 } }}
      InputLabelProps={{ style: { fontSize: 18 } }}
    />
  );
};

TextInput.defaultProps = {
  defaultValue: "",
  type: "text",
  multiline: false,
  inputProps: {},
  className: "",
};

export default TextInput;
