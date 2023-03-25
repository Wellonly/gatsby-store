import React from "react";
import {
  Paper,
  Typography,
} from "@material-ui/core";

import useStyles from "./stylesProductPrice";

export default function ProductPrice({highprice, price, optprice, optfrom, i18}) {
  const classes = useStyles();

  return (
    <Paper align="left" elevation={3} className={classes.rootProductPrice} >
      <Typography
        display="inline"
        variant="h5"
        color="textPrimary"
        className={classes.productPrice}
      >
        {`${price} ${i18.currency}`}
      </Typography>
      {price < highprice &&
        <Typography
          display="inline"
          variant="h6"
          color="textSecondary"
          className={classes.productHighPrice}
        >
          {`―${highprice}${i18.currency}―`/*unicode Character: ― U+2015 Name: HORIZONTAL BAR*/}
        </Typography>
      }
      {optfrom &&
        <Typography display="inline" className={classes.productOptPrice}>
          {`${i18.bulkFrom} ${optfrom}: ${optprice}${i18.currency}`}
        </Typography>
      }
    </Paper>
  );
}