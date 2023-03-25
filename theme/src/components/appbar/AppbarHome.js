import React from "react";
import {Box, ButtonBase} from "@material-ui/core";
import {Link} from "gatsby";

import useStyles from "./styles";

export default function AppbarHome({link}) {
  const {label} = link;
  const classes = useStyles();
  return (
    <Box display="flex" flexGrow={1}>
      <ButtonBase
        component={Link}
        to="/"
        classes={{root: classes.titleButton}}
      >
        {label || 'Home'}
      </ButtonBase>
    </Box>
  );
}