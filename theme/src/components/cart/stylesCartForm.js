import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(theme => {
  return ({
    root: {
      display: 'block',
      maxWidth: 999,
    },
    form: {
      display: 'block',
      maxWidth: 999,
    },
    gridItem: {
      marginTop: '11px',
      alignSelf: 'left',
    },
    gridInviter: {
      // marginTop: '21px',
      // marginRight: '7px',
    },
    avatarSmall: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      border: 'solid deepskyblue 1px',
      marginRight: '21px',
      // padding: '16px',
      // marginTop: '21px',
    },
});
});

