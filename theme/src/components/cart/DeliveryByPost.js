import React, {useState} from "react";
import {
  Paper,
  TextField,
} from "@material-ui/core";

export default function DeliveryByPost({orderData, carrier, i18}) {
  const [changed, setChanged] = useState(orderData.hasOwnProperty('addressToPost'));
  const [address, setAddress] = useState(changed ? orderData.addressToPost: addressInit(orderData));
  return (
    <Paper>
      <TextField
        id="delivery-address-post"
        style={{marginTop: 11}}
        multiline
        rowsMax={10}
        fullWidth
        label={i18.deliveryAddress}
        variant='outlined'
        value={address}
        onChange={changeAddressHandle}
      />
    </Paper>
  );
  function changeAddressHandle(e) {
    orderData.addressToPost = e.target.value;
    setAddress(e.target.value);
    setChanged(true);
  }
  function addressInit({countryCode, countryName, cityName, city}) {
    const ret = [];
    const cfgCountryCode = (window && window.cfg && window.cfg.countryCode) || '-';
    if (countryCode === 'RU') {
      if (city && city.postal) ret.push(city.postal.toString());
      if (countryCode !== cfgCountryCode) ret.push(countryName);
      ret.push(cityName);
    }
    else {
      ret.push(cityName);
      if (countryCode !== cfgCountryCode) ret.push(countryName);
    }
    return ret.join(',\n');
  }
}