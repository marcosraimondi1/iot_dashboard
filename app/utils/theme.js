import { createTheme } from "@mui/material/styles";

const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;

// https://bareynol.github.io/mui-theme-creator/
// https://m2.material.io/inline-tools/color/
