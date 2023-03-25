import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#979955"
    },
    secondary: {
      main: "#41b4bf"
    },
    type: "light",
    text: {
      primary: "#101012",
      // secondary: "#28a745" //green
      secondary: "#545456"
    },
    error: {
      main: "#d32f2f"
    },
    success: {
      main: "#28a745"
    }
  }
});
