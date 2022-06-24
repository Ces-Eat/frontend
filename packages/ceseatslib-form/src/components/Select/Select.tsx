import React, { Fragment } from "react";
import { Control, useController } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";

interface SelectProps {
  name: string;
  label: string;
  control: Control<any, any>;
  defaultValue?: string | number | boolean;
  className?: string;
  chooses: {
    value: string | number | boolean;
    label: string | number;
  }[];
}

const Select: React.FC<SelectProps> = ({
  name,
  label,
  defaultValue,
  chooses,
  className,
  control,
  ...selectFieldProps
}) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
  });
  return (
    <FormControl className={className}>
      <InputLabel id={`${label.trim()}-label`}>{label}</InputLabel>
      <MuiSelect
        labelId={`${label.trim()}-label`}
        id={`${label}-id`}
        error={!!fieldState.error}
        {...{ ...field, ...selectFieldProps }}
        label={label}
        variant="standard"
        fullWidth
      >
        {chooses.map((choose) => (
          <Fragment key={choose.value.toString()}>
            <MenuItem value={choose.value.toString()}>{choose.label}</MenuItem>
          </Fragment>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

Select.defaultProps = {
  defaultValue: "",
  className: "",
};

export default Select;
