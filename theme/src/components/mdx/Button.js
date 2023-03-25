import React from "react";
import { Button as MButton } from '@material-ui/core'
import { Link } from "gatsby";

export function Button({children, ...rest}) {

  return (
    <MButton component={Link} {...rest}>
      {children}
    </MButton>
  );
}
