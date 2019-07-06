import { TextField as MaterialTextField } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";
import * as React from "react";

type Props = TextFieldProps;

export default function TextField({ variant, ...props }: Props) {
  return (
    <MaterialTextField
      fullWidth
      margin="normal"
      variant="outlined"
      {...props}
    />
  );
}
