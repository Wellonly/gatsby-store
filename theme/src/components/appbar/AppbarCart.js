import React, {useContext} from "react";
import {Badge, IconButton} from "@material-ui/core";
import {navigate} from "gatsby";
import {makeLinkSlug} from "../../lib/slug";

import useStyles from "./styles";
import {MdShoppingCart} from "react-icons/all";
import {UserStateContext} from "../../context/UserContext";

export default function AppbarCart({link}) {
  const {slug} = link;
  const classes = useStyles();
  const userContext = useContext(UserStateContext);

  console.log('...zv: AppbarCart:', userContext);

  const incart = userContext.inCart.reduce((acc,prod) => {
      return prod.inside ? acc+1: acc;
  },0);
  return (
    <IconButton
      className={classes.basketButton}
      color="inherit"
      aria-label="menu"
      onClick={() => navigate(makeLinkSlug(slug))}
    >
      <Badge badgeContent={incart} color="secondary">
        <MdShoppingCart/>
      </Badge>
    </IconButton>
  );
}