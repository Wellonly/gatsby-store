import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(theme => {
  return ({
    rootProductPrice: {

    },
    productPrice: {
      marginRight: '15px',
    },
    productHighPrice: {
      textDecoration: "line-through",
      // color: theme.palette.text.secondary,
    },
    productOptPrice: {
      marginLeft: '22px',
    },
  });
});
