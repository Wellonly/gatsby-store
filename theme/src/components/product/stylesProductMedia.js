import {makeStyles} from "@material-ui/core/styles";

export default makeStyles(theme => {
  return ({
    rootProductMedia: {
      display: 'block',
      width: '50%',
    },
    gridList: {
      flexWrap: 'nowrap',
      // transform: 'translateZ(0)', // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    },
    title: {
      color: theme.palette.primary.light,
    },
    cover: {
      width: 499,
      height: 499,
      // border: 'solid 1px',
    },
    imageWborder: {
      // border: 'solid deepskyblue 1px',
      maxWidth: '64px',
      maxHeight: '64px',
    },
    imageWOborder: {
      // border: 0,
    },
    titleBar: {
      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  });
});
