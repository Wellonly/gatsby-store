import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
// import { makeStyles } from "@material-ui/styles";
import {
  Box,
  SwipeableDrawer,
  /*, Drawer,*/
  IconButton,
  List,
  ListItem,
  Typography,
  makeStyles,
  /*useMediaQuery,*/
} from "@material-ui/core";
import { MdClose } from "react-icons/md";
// import Divider from '@material-ui/core/Divider';

export const DRAWER_WIDTH = 240;
export const CLOSED_DRAWER_WIDTH = 55;

export default function SideBar({ open, onClose }) {
  const classes = useStyles();

  // const isXSmall = useMediaQuery(theme => theme.breakpoints.down('xs'));
  // const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  // const isDesktop = useMediaQuery(theme => theme.breakpoints.up('md'));

  // console.log("...zv useMediaQuery on width in pixels: isXSmall(xs:<600), isSmall(sm:600..960), isDesktop(md:>960):", isXSmall, isSmall, isDesktop);

  function onOpen(props) {
    console.log("...onOpen(props):", props);
  }

  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              components {
                appbar {
                  links {
                    title
                    url
                  }
                }
              }
            }
          }
        }
      `}
      render={({
        site: {
          siteMetadata: {
            title,
            components: {
              appbar: { links }
            }
          }
        }
      }) => (
        <SwipeableDrawer
          // variant={isPermanent ? "permanent" : "temporary"}
          variant={/*open ? *//*"permanent"*//*"temporary"*/"persistent"}
          classes={{ paper: classes.drawer }}
          open={open}
          onClose={onClose}
          onOpen={onOpen}
        >
            <Box display="flex" flexDirection="column" padding={1}>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1} paddingLeft={1}>
                        <Typography color='textSecondary' variant="h6" style={{ fontFamily: "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" }}>
                            {title}
                        </Typography>
                    </Box>
                    <IconButton onClick={onClose}>
                        <MdClose />
                    </IconButton>
                </Box>
                <List>
                    {links.map(link => {
                        return (
                            <ListItem button key={link.title} to={link.url} component={Link}>
                                {link.title}
                            </ListItem>
                        );
                    })}
                </List>
            </Box>
        </SwipeableDrawer>
      )}
    />
  );
};

const useStyles = makeStyles(theme => ({
  drawer: {
    zIndex: 1,
    minWidth: 300,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  ul: {
    padding: 0,
    listStyle: "none",
    "& li": {
      marginBottom: theme.spacing(0.5)
    },
    "& a": {
      textDecoration: "none"
    },
    "& a:hover": {
      textDecoration: "underline"
    }
  }
}));

