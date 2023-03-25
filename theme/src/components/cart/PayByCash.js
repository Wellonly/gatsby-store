import React from "react";
import {Paper} from "@material-ui/core";

export default function PayByCash({paymethod, orderData, i18}) {

  return (
    <Paper>
      {`PayByCash: ${paymethod.title} for ${paymethod.descript}`}
    </Paper>
  );
}