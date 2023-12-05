import { createTheme } from "@mui/material";

export const THEME = { colors: { primary: "#7961f2", secondary: "#212121" } };

export const MuiTheme = createTheme({
  palette: {
    primary: {
      main: THEME.colors.primary,
    },
    secondary: {
      main: THEME.colors.secondary,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          borderRadius: 26,
          fontWeight: "bold",
          border: "1px solid",
          padding: "0.5rem 1.5rem",
        },
      },
    },
  },
});
