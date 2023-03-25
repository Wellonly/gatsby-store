import { makeStyles } from "@material-ui/core/styles";

// export const DRAWER_MIN_WIDTH = 1280/4; //=320
export const CLOSED_DRAWER_WIDTH = 50; //55

export default makeStyles(theme => {
  return ({
    menuButton: {
      marginLeft: 1/*12*/,
      marginRight: 3 /*36*/,
    },
    hide: {
      display: "none",
    },
    drawer: {
      zIndex: 1,
      width: props => sidebarWidth(theme),
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: props => sidebarWidth(theme),
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: /*theme.spacing(7) +*/ CLOSED_DRAWER_WIDTH,
      [theme.breakpoints.down("sm")]: {
        width: props => sidebarWidth(theme),
      },
    },
    toolbar: {
      ...theme.mixins.toolbar,
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
    /* sidebarList: {
      marginTop: theme.spacing(6),
    }, */
    mobileBackButton: {
      // marginTop: theme.spacing(0.5),
      // marginLeft: theme.spacing(3),
      [theme.breakpoints.only("sm")]: {
        marginTop: theme.spacing(0.625),
      },
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  });
  function sidebarWidth(theme) {
    const innerWidth = window.innerWidth;
    const md = theme.breakpoints.values.md;
    return innerWidth < md ? innerWidth: 300;
  }
});

