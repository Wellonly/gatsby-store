import React, {Fragment, useContext, useState} from "react";
import {
  Paper,
  Button,
  Typography,
  FormControl, Input,
} from "@material-ui/core";

import useStyles from "./stylesProductQuantity";
import {navigate} from "gatsby";
import {UserStateContext} from "../../context/UserContext";

export default function ProductQuantity({product, i18}) {
  const {stock} = product;
  const classes = useStyles();
  const userContext = useContext(UserStateContext);
  const [count, setCount] = useState(1);
  const [savedStock, saveStock] = useState(stock);
  if (savedStock !== stock) {
    if (count > stock) setCount(stock);
    saveStock(stock);
    return <Fragment/>;
  }
  return (
    <Paper align="left" elevation={0} className={classes.rootProductQuantity} noValidate autoComplete="off">
      <Button variant="outlined" color="primary" onClick={() => clickQuantButton(-1)} className={classes.buttonQuantity}>-</Button>
      <FormControl variant="outlined" size='small' className={classes.inputQuantity}>
        <Input value={count} onChange={changeHandler} id="amount-input" inputProps={{style: { textAlign: 'center' }}}/>
      </FormControl>
      <Button variant="outlined" color="primary" onClick={() => clickQuantButton(1)} className={classes.buttonQuantity}>+</Button>
      <Typography display="inline" className={classes.availableQuantity}>
        {`${i18.available}: ${stock}`}
      </Typography>
      <div className={classes.buyButtonsDiv}>
        <Button variant="contained" color="primary" onClick={() => clickBuyButton(true)}>
          {i18.buyNow}
        </Button>
        <Button variant="contained" color="secondary" onClick={() => clickBuyButton(false)} className={classes.buyButton}>
          {i18.addToCart}
        </Button>
      </div>
    </Paper>
  );
  function changeHandler(event) {
    event.preventDefault();
    setAmount(parseInt(event.target.value,10));
  }
  function clickQuantButton(trend) {
    setAmount(count+trend);
  }
  function setAmount(value) {
    if (Number.isNaN(value) || value <= 0) {
      return setCount(1);
    }
    if (value > stock) {
      return setCount(stock);
    }
    setCount(value);
  }
  function clickBuyButton(goCart) {
    const cart = userContext.inCart.reduce((acc,prod) => {
        if (prod.inside) {
            return [...acc, prod];
        }
        return [...acc]; //remove outsiders
    },[{inside: true, count, ...product}]);
    userContext.dispatch({inCart: cart});
    if (goCart) {
      navigate('/cart');
    }
  }
}
