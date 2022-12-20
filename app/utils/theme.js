import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// paleta de colores: #653924 #873614 #694336 #C6C0B7 #E86A0E

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#653924"
    },
    secondary: {
      main: "#E86A0E"
    },
    error: {
      main: red.A400
    }
  }
});

export default theme;
