import { createTheme } from "@mui/material";
import { grey, indigo, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: red[500],
    },
    background: {
      default: grey[50],
    },
  },
});

export default theme;
