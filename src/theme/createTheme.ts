import { createMuiTheme } from "@material-ui/core";

export default function createTheme() {
  return createMuiTheme({
    typography: {
      useNextVariants: true
    }
  });
}
