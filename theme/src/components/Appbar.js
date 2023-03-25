import React, { Fragment, useState } from "react";
import { Link, navigate /*, StaticQuery, graphql */} from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Badge,
  Chip,
  /*useMediaQuery*/
} from "@material-ui/core";
import { MdMenu, MdShoppingCart } from "react-icons/md";
import {makeLinkSlug} from "../lib/slug";

// context
import {/*useLayoutState, */useLayoutDispatch, toggleSidebar} from "../context/LayoutContext";

const AppBarLinks = ({ links }) => {
  const classes = useStyles();

  return links.map(({ slug, component, label}) => {
    if ( slug !== '/' && slug !== 'cart') {
      if (!component || component === 'Button') {
        return (
          <ButtonBase
            component={slug && Link}
            to={makeLinkSlug(slug)}
            classes={{root: classes.titleButton}}
            key={label}
          >
            {label}
          </ButtonBase>
        );
      } else if (component === 'Chip') {
        return (
          <Chip
            component={slug && Link}
            to={makeLinkSlug(slug)}
            classes={{root: classes.titleButton}}
            key={label}
          >
            {label}
          </Chip>
        );
      }
    }
    return (<Fragment/>);
  });
};

export default function Appbar({ links, elevation = 1/*, onToggleDrawer*/}) {
  const classes = useStyles();
  // const [ basket, setBasket ] = useState(null);
  // const isXs = useMediaQuery(theme => theme.breakpoints.up("xs"));

  // global
  // const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  const titlelink = links.find(({slug}) => slug === '/');
  const cartlink = links.find(({slug}) => slug === 'cart');

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
        <Box display="flex" flexGrow={1}>
          <ButtonBase
            component={Link}
            to="/"
            classes={{ root: classes.titleButton }}
          >
            {(titlelink && titlelink.label) || 'Home' }
          </ButtonBase>
        </Box>
        {// Display the appbar action links if the media query breakpoint is larger than Xs.
          /*!isXs &&*/ <AppBarLinks links={links} />
        }
        {cartlink && (
          <IconButton
            className={classes.basketButton}
            color="inherit"
            aria-label="menu"
            onClick={() => navigate(makeLinkSlug(cartlink.slug))}
            // onClick={()=>{basket ? setBasket(basket+1) : setBasket(1)}}
        >
          <Badge badgeContent={1/*basket*/} color="secondary" >
              <MdShoppingCart />
          </Badge>
        </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    // display: { xs: 'none', sm: 'none', lg: 'none' }
  },
  basketButton: {
    marginRight: theme.spacing(1)
  },
  titleButton: {
    padding: theme.spacing(1),
    borderRadius: "4px",
    transition: "background-color .125s ease",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0.25)"
    },
    "&:first-child": {
      // Site title.
      fontFamily: "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif"
    }
  }
}));
