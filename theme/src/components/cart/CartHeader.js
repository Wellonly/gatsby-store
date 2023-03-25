import React from "react";
import {
  Typography,
  Paper,
} from "@material-ui/core";

export default function CartHeader({className, children}) {

  return (
    <Paper elevation={0} variant="outlined" style={{ backgroundColor: "lightblue" }} className={className}>
      <Typography>
        {children}
      </Typography>
    </Paper>
  );
}