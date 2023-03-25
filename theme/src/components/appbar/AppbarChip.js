import React from "react";
import {Chip} from "@material-ui/core";
import {Link} from "gatsby";

import {makeLinkSlug} from "../../lib/slug";
import useStyles from "./styles";

export default function AppbarChip({link}) {
  const {slug, label} = link;
  const classes = useStyles();
  return (
   <Chip
      component={slug && Link}
      to={makeLinkSlug(slug)}
      label={label}
      classes={{root: classes.titleButton}}
   />
  );
}