import React, {useState} from "react";
import {Grid, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";

import CountrySelect, {countries} from "../../lib/CountrySelect";

export default function YourLocation({orderData, cities, i18}) {
  const [cityName, setCityName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [openCountrySelect, setOpenCountrySelect] = useState(false);

  let country;
  const code = !!countryCode ? countryCode: orderData.city ? orderData.city.countryCode: (window && window.cfg && window.cfg.countryCode);
  country = code ? countries.find(value => value.code === code): undefined;

  orderData.countryCode = country ? country.code: '';
  orderData.countryName = country ? country.name: '';
  orderData.cityName = cityName;

  // console.log('...zv: YourLocation:', countryCode, cityName, country, (window && window.cfg && window.cfg.countryCode));

  return (
    <Grid container alignItems="flex-start">
      <Grid item xs={6}>
        <Autocomplete
          id="select-city"
          freeSolo
          value={cityName}
          options={cities.map((city) => `${city.name}, ${city.area}`)}
          renderInput={(params) => (
            <TextField {...params} label="" margin="normal" variant="outlined" />
          )}
          style={{marginTop: -28, marginLeft: 5}}
          autoSelect
          onChange={cityChangeHandler}
        />
      </Grid>
      <Grid item xs={6}>
        <CountrySelect
          style={{marginTop: -12, marginLeft: 11}}
          label={i18.country}
          open={openCountrySelect}
          onClose={() => handleCountrySelect(false)}
          onOpen={() => handleCountrySelect(true)}
          options={!!orderData.city ? [countries[0]]: countries}
          disableClearable={!!orderData.city}
          value={country}
          onChange={countryChangeHandler}
        />
      </Grid>
    </Grid>
  );
  function cityChangeHandler(e, value, reason) {
    console.log('...zv: cityChangeHandler:', e, value, reason);
    const cityValue = value && value.split(',')[0]; //e.target.value;
    const city = cityValue ? cities.find(city => city.name.indexOf(cityValue) >= 0): null;
    setCityName(city ? `${city.name}, ${city.area}`: cityValue);
    orderData.city = city;
    if (city) {
      setCountryCode(window && window.cfg && window.cfg.countryCode);
    }
    if (!city && reason === 'create-option') {
      setOpenCountrySelect(true);
    }
    if (reason === 'clear') {
      setCountryCode('');
    }
  }
  function countryChangeHandler(e, value, reason) {
    console.log('...zv: countryChangeHandler:', e, value, reason);
    setCountryCode(value ? value.code: '');
  }
  function handleCountrySelect(isOpen) {
    setOpenCountrySelect(isOpen);
  }
}