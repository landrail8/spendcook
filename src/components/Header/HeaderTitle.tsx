import * as React from "react";
import { Typography } from "@material-ui/core";
import { TypographyProps } from "@material-ui/core/Typography";

interface Props extends TypographyProps {}

export default function HeaderTitle({ style, ...props }: Props) {
  return (
    <Typography
      variant="h6"
      color="inherit"
      style={{ flexGrow: 1, ...style }}
      {...props}
    />
  );
}
