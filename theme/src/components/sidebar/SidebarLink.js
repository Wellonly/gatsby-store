import React, { useState, Fragment } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  /*ListItemAvatar, Avatar,*/
  ListItemText,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { Link } from "gatsby";
import classnames from "classnames";
import Dot from "../Dot";
import useStyles from "./stylesSidebarLink";
import {makeLinkSlug} from "../../lib/slug";

export default function SidebarLink({
  item,
  location,
  isSidebarOpened,
  nested,
}) {
  const {slug, icon, label, sublinks, component} = item;
  const classes = useStyles();

  const madeSlug = nested || makeLinkSlug(slug);

  // local
  const [isOpen, setIsOpen] = useState(!!item.state);
  const isLinkActive = madeSlug === location.pathname;

  if (component === "title")
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !isSidebarOpened,
        })}
      >
        {label}
      </Typography>
    );

  if (component === "divider") return <Divider className={classes.divider} />;

  return (
    <Fragment>
      <ListItem
        button
        component={madeSlug && Link}
        to={madeSlug}
        onClick={sublinks ? toggleCollapse: undefined}
        className={classes.link}
        disableRipple={!sublinks}
      >
        <Tooltip title={label} enterDelay={isSidebarOpened ? 10000: 100}>
          <ListItemIcon
            className={classnames(classes.linkIcon, {
              [classes.linkIconActive]: isLinkActive,
            })}
          >
            {/*<Avatar>*/}
            {icon && false ? icon: <Dot color={isLinkActive && "primary"} />}
            {/*</Avatar>*/}
          </ListItemIcon>
        </Tooltip>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !isSidebarOpened,
            }),
          }}
          primary={label}
        />
      </ListItem>
      {sublinks && (
        <Collapse
          in={isOpen && isSidebarOpened}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {sublinks.map(childItem => {
              const nestedSlug = makeLinkSlug(childItem.slug, slug);
              return (
                <SidebarLink
                  key={nestedSlug}
                  location={location}
                  isSidebarOpened={isSidebarOpened}
                  classes={classes}
                  nested={nestedSlug}
                  item={childItem}
                />
            )})}
          </List>
        </Collapse>
      )}
    </Fragment>
  );

  // add functions...

  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      item.state=!isOpen;
      setIsOpen(item.state);
    }
  }
}
