import React, {useContext} from "react";
import {
  Typography,
  Paper,
  Button,
  Box,
} from "@material-ui/core";

import useStyles from "./stylesCart";
import {UserStateContext} from "../../context/UserContext";
import CartHeader from "./CartHeader";
import CartTable from "./CartTable";
import CartForm from "./CartForm";

export default function Cart({carriers, paymethods, cities, i18}) {
  const classes = useStyles();
  const userContext = useContext(UserStateContext);

  const orderData =  calcOrderData(userContext);
  orderData.orderDate = Date.now();

  return (
    <Paper elevation={1} className={classes.root} variant="outlined">
      <Typography color="secondary" variant="h4">{i18.cart}</Typography>
      <CartHeader>{i18.goodsInCart}:</CartHeader>
      <CartTable context={userContext} i18={i18}/>
      <CartHeader className={classes.fillOrderHeader}>{i18.fillOrder}:</CartHeader>
      <CartForm carriers={carriers} paymethods={paymethods} cities={cities} orderData={orderData} i18={i18}/>
      <Box align="center">
        <Button variant="contained" color="secondary" onClick={makeOrderHandle} className={classes.makeOrderButton}>{i18.makeOrder}</Button>
      </Box>
    </Paper>
  );
  function makeOrderHandle(e) {
    e.preventDefault();
    console.log('...zv: makeOrderHandle:', orderData, userContext);
  }
}

function calcOrderData(context) {
  const {inCart} = context;
  return inCart.reduce((acc, row) => {
    const weight = row.inside ? row.weight * row.count: 0;
    const volume = row.inside ? (row.length * row.width * row.height) * row.count: 0;
    if (weight) {
      return {...acc, weight: weight+acc.weight, volume: volume+acc.volume};
    }
    return {...acc};
  }, {distance: 0, weight: 0, volume: 0});
}

