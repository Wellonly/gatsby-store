import React from "react";
import {Paper} from "@material-ui/core";

export default function DeliveryByCarrier({city, carrier, i18}) {

  return (
    <Paper>
      {`DeliveryByCarrier: ${carrier.calculated} for ${carrier.title}`}
    </Paper>
  );
}