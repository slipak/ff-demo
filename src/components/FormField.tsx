import { TextField, TextFieldProps } from "@mui/material";
import { Field, FieldProps, FieldValidator } from "formik";
import React from "react";

export type Props = {
  name: string;
  label?: string;
  variant?: TextFieldProps["variant"];
  size?: TextFieldProps["size"];
  type?: TextFieldProps["type"];
  required?: boolean;
  validate?: FieldValidator;
  readOnly?: boolean;
  helperText?: React.ReactNode;
  autoComplete?: TextFieldProps["autoComplete"];
  onFocus?: () => void;
};

const FormField = ({
  name,
  label,
  variant = "outlined",
  required,
  size,
  validate,
  readOnly,
  helperText,
  type,
  autoComplete,
  onFocus,
}: Props) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, meta }: FieldProps) => (
        <TextField
          id={name}
          label={label}
          variant={variant}
          name={field.name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          fullWidth
          error={Boolean(meta.touched && meta.error)}
          helperText={
            meta.touched && meta.error
              ? meta.error
              : helperText
              ? helperText
              : ""
          }
          required={required}
          size={size}
          InputProps={{
            readOnly,
          }}
          autoComplete={autoComplete}
          type={type}
          onFocus={onFocus}
        />
      )}
    </Field>
  );
};

export default FormField;
