import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(theme => {
  return ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(1),
      // display: { xs: 'none', sm: 'none', lg: 'none' }
    },
    basketButton: {
      marginRight: theme.spacing(1)
    },
    titleButton: {
      padding: theme.spacing(1),
      borderRadius: "4px",
      transition: "background-color .125s ease",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.25)"
      },
      "&:first-child": {
        // Site title.
        fontFamily: "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
      }
    }
  });
});
