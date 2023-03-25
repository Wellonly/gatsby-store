import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(theme => {
  return ({
    root: {
      display: 'flex',
      maxWidth: 999,
      marginTop: '5px',
    },
    card: {
      background: "transparent"
    },
    productDescript: {
      marginBottom: '11px',
    },
    // productPrice: {
    //   marginBottom: '5px',
    // },
    cardContent: {
      // display: 'block',
      // padding: 12,
      width: '50%',
      // alignContent: "left",
    },
    cover: {
      width: 512,
      height: 512,
    },
    productQuantity: {
      marginTop: '22px',
    },
  });
});
