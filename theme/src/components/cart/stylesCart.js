import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(theme => {
  return ({
    root: {
      display: 'block',
      maxWidth: 999,
      marginTop: '5px',
    },
    makeOrderButton: {
      marginTop: '11px',
      backgroundColor: "green",
    },
    fillOrderHeader: {
      marginTop: '5px',
    },
  });
});
