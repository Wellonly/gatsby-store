import React from "react";
import {ButtonBase} from "@material-ui/core";
import {Link} from "gatsby";
import {makeLinkSlug} from "../../lib/slug";
import useStyles from "./styles";

export default function AppbarButton({link}) {
  const { slug, label} = link;
  const classes = useStyles();
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
}
