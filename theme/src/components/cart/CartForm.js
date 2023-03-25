import React, {useState} from "react";
import {
  Paper,
  Avatar,
  TextField,
  Typography,
  Grid,
  /*FormGroup,*/
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import useStyles from "./stylesCartForm";
import YourLocation from "./YourLocation";
import DeliveryTabs from "./DeliveryTabs";
import PayTabs from "./PayTabs";

const inviteComponent = 'h6';

export default function CartForm({carriers, paymethods, cities, orderData, i18}) {
  const classes = useStyles();
  const [buyer, setBuyer] = useState('priv');
  orderData.buyer = buyer;

  // console.log('...zv: CartForm:', buyer);
  return (
    <Paper elevation={1} className={classes.root} variant="outlined">
      <form /*className={classes.form}*/ noValidate autoComplete="off">
        <Grid container alignItems="flex-start">
          <GridItem item={1} inviter={i18.yourCity} xs={10}>
            <YourLocation cities={cities} orderData={orderData} i18={i18} />
          </GridItem>
          <GridItem item={2} inviter={i18.buyer} xs={9}>
            <RadioGroup row aria-label="buyer" name="buyer" value={buyer} onChange={buyerChangeHandler} style={{marginTop:-5, marginLeft:11}}>
              <FormControlLabel value="priv" control={<Radio />} label={i18.privatePerson} />
              <FormControlLabel value="corp" control={<Radio />} label={i18.organization} />
            </RadioGroup>
          </GridItem>
          <GridItem item={3} inviter={i18.delivery} xs={10}>
            <DeliveryTabs carriers={carriers} orderData={orderData} i18={i18} />
          </GridItem>
          <GridItem item={4} inviter={i18.payMethod} xs={10}>
            <PayTabs paymethods={paymethods} carriers={carriers} orderData={orderData} i18={i18} />
          </GridItem>
          <GridItem item={5} inviter={i18.extraInfo} xs={10}>
            <TextField multiline fullWidth id="extra-info" label="" variant="outlined" onChange={e => orderData.extraInfo = e.target.value}/>
          </GridItem>
        </Grid>
      </form>
    </Paper>
  );
  function GridItem({item, inviter, xs, children}) {
    return (
      <Grid item xs={12} className={classes.gridItem}>
        <Grid container alignItems="flex-start">
          <Grid item className={classes.gridItem}>
            <Avatar className={classes.avatarSmall}>{item.toString()}</Avatar>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Typography variant={inviteComponent} className={classes.gridInviter}>{inviter}:</Typography>
          </Grid>
          <Grid item xs={xs} className={classes.gridItem}>
            {children}
          </Grid>
        </Grid>
      </Grid>
    );
  }
  function buyerChangeHandler(e) {
    setBuyer(e.target.value);
  }
}
