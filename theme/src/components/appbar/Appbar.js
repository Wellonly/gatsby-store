import React, { Fragment } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  /*useMediaQuery*/
} from "@material-ui/core";
import { MdMenu } from "react-icons/md";

import useStyles from "./styles";
import AppbarButton from "./AppbarButton";
import AppbarChip from "./AppbarChip";
import AppbarHome from "./AppbarHome";
import AppbarCart from "./AppbarCart";

// context
import {/*useLayoutState, */useLayoutDispatch, toggleSidebar} from "../../context/LayoutContext";

const AppBarLinks = ({ links }) => {
  return links.map((link) => {
    const { slug, component, label} = link;
    if ( slug === '/') {
      return (<AppbarHome key={label} link={link}/>);
    }
    if (slug === 'cart') {
      return (<AppbarCart key={label} link={link}/>);
    }
    if (!component || component === 'Button') {
      return (<AppbarButton key={label} link={link}/>);
    } else if (component === 'Chip') {
      return (<AppbarChip key={label} link={link}/>);
    }
    return (<Fragment/>);
  });
};

export default function Appbar({ links, elevation = 1/*, onToggleDrawer*/}) {
  const classes = useStyles();
  // const isXs = useMediaQuery(theme => theme.breakpoints.up("xs"));
  // global
  // const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  return (
    <AppBar color="primary" position="sticky" elevation={elevation} className={classes.appBar}>
      <Toolbar>
        { /*isXs &&*/ (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleSidebar(layoutDispatch)/*onToggleDrawer*/}
          >
            <MdMenu />
          </IconButton>
        )}
        <AppBarLinks links={links} />
      </Toolbar>
    </AppBar>
  );
};

