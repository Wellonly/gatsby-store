import React from "react";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

export default function DeliveryByCourier({orderData, carrier, i18}) {
  const [dateOffset, setDateOffset] = React.useState(0);
  const [timeOffset, setTimeOffset] = React.useState(0);
  orderData.courierDateOffset = dateOffset;
  orderData.courierTimeOffset = timeOffset;

  const locale = (window && window.cfg && window.cfg.locale) || 'en-US';

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <Paper>
      <div>
        <FormControl >
          <InputLabel id="prefer-date-label">{i18.preferableDate}</InputLabel>
          <Select
            labelId="prefer-date-label"
            id="prefer-date-select"
            value={dateOffset}
            onChange={handleDateChange}
          >
            {
              Array.from({length:14}, (v,i) => {
                const dateOffsetted = new Date(orderData.orderDate+(i*24*3600*1000));
                return (<MenuItem key={i} value={i}>{dateOffsetted.toLocaleString(locale, dateOptions)}</MenuItem>);
              })
            }
          </Select>
        </FormControl>
        <FormControl style={{marginLeft: 22}}>
          <InputLabel id="prefer-time-label">{i18.time}</InputLabel>
          <Select
            labelId="prefer-time-label"
            id="prefer-time-select"
            value={timeOffset}
            onChange={handleTimeChange}
          >
            {
              Array.from({length:8}, (v,i) => {
                const timeOffsetted = 9+i;
                return (<MenuItem key={i} value={i}>{i ? `${timeOffsetted} .. ${timeOffsetted+3}`: `9 .. 20`}</MenuItem>);
              })
            }
          </Select>
        </FormControl>
      </div>
      <TextField
        id="delivery-address-courier"
        style={{marginTop: 11}}
        multiline
        rowsMax={10}
        fullWidth
        label={i18.deliveryAddress}
        variant='outlined'
        value={orderData.addressToCourier}
        onChange={changeAddressHandle}
      />
    </Paper>
  );
  function handleDateChange(e) {
    setDateOffset(e.target.value);
    setTimeOffset(0);
  }
  function handleTimeChange(e) {
    setTimeOffset(e.target.value);
  }
  function changeAddressHandle(e) {
    orderData.addressToCourier = e.target.value;
  }
}