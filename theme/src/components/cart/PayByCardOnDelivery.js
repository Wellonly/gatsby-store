import React from "react";
import {Paper} from "@material-ui/core";

export default function PayByCardOnDelivery({paymethod, orderData, i18}) {

  return (
    <Paper>
      {`PayByCardOnDelivery: ${paymethod.title} for ${paymethod.descript}`}
    </Paper>
  );
}