import React from "react";
import {Paper} from "@material-ui/core";

export default function PayByCardOnline({paymethod, orderData, i18}) {

  return (
    <Paper>
      {`PayByCardOnline: ${paymethod.title} for ${paymethod.descript}`}
    </Paper>
  );
}