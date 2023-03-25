import React, { useState, useEffect } from "react";
import { SwipeableDrawer, IconButton, List } from "@material-ui/core";
import {
  MdArrowBack as ArrowBackIcon,
} from "react-icons/md"; //"@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import classNames from "classnames";

import SidebarLinkCollections from "./SidebarLinkCollections";
import SidebarLinkCategories from "./SidebarLinkCategories";

import useStyles from "./styles";
import SidebarLink from "./SidebarLink";
import {useLayoutState, useLayoutDispatch, toggleSidebar, onSidebar, offSidebar} from "../../context/LayoutContext";
// import Dot from "../Dot";

export default function Sidebar(props) {
  const {links } = props;

  const classes = useStyles();
  const theme = useTheme();

  // global
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  const {location} = window;
  return (
    <SwipeableDrawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
      onClose={() => offSidebar(layoutDispatch)}
      onOpen={() => onSidebar(layoutDispatch)}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton} /*TODO: remove the <div> if not used*/ >
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {links.map(item => {
          if (item.slug === 'collections') {
            return (
              <SidebarLinkCollections
                key={item.id}
                location={location}
                isSidebarOpened={isSidebarOpened}
                item={item}
              />
            );
          }
          if (item.slug === 'categories') {
            return (
              <SidebarLinkCategories
                key={item.id}
                location={location}
                isSidebarOpened={isSidebarOpened}
                item={item}
              />
            );
          }
          return (
            <SidebarLink
              key={item.id}
              location={location}
              isSidebarOpened={isSidebarOpened}
              item={item}
            />
          );
        })}
      </List>
    </SwipeableDrawer>
  );

  //...
  function handleWindowWidthChange() {
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

