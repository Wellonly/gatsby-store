import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import {Badge /*Avatar*/} from '@material-ui/core';
import {mediaPathBrowser} from "../../lib/mediaBrowser";
import {Image} from "../mdx/Image";
import DeliveryBySelf from "./DeliveryBySelf";
import DeliveryByCourier from "./DeliveryByCourier";
import DeliveryByCarrier from "./DeliveryByCarrier";
import DeliveryByPost from "./DeliveryByPost";


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     // backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function DeliveryTabs({carriers, orderData, i18, ...other}) {
  // const classes = useStyles();
  const [tabId, setTabId] = React.useState(carriers.length && carriers[0].id);
  orderData.deliveryTabId = tabId;
  // console.log('...zv: DeliveryTabs:', tabId, orderData, carriers, i18);

  carriers.forEach((car,i) => {
    let value;
    try {
      /*eslint no-new-func: 0*/
      const func = new Function(`return ({weight, volume, distance}) => ${car.calc};`);
      value = func()(orderData);
    }
    catch (e) {
      console.log('...zv: delivery cost calc fail for:', car.title,'; error:', e);
    }
    carriers[i].calculated = value;
  });
  //className={classes.root}
  return (
    <div {...other}>
      <TabContext value={tabId}>
        <TabList onChange={handleChange} aria-label="delivery-tabs">
          {
            carriers.map((item) => {
              return isDeliveryIncluded(item.calculated, item.priority) && (
                <Tab
                  key={item.id}
                  label={item.title}
                  value={item.id}
                  icon={
                    <Badge badgeContent={`${item.calculated}${(item.priority > 1 && item.calculated <10) ? '*':''}${i18.currency}`} color="secondary">
                      <Image src={mediaPathBrowser(item.images.split(',')[0])} width={64} height={55}/>
                    </Badge>
                  }
                />
              );
            })
          }
        </TabList>
        {
          carriers.map((carrier) => {
            if (!isDeliveryIncluded(carrier.calculated, carrier.priority)) return undefined;
            const tab = carrier.priority === 1 ? (
              <DeliveryBySelf orderData={orderData} carrier={carrier} i18={i18}/>
            ) : carrier.priority === 2 ? (
              <DeliveryByCourier orderData={orderData} carrier={carrier} i18={i18}/>
            ) : carrier.priority === 3 ? (
              <DeliveryByPost orderData={orderData} carrier={carrier} i18={i18}/>
            ) : (
              <DeliveryByCarrier orderData={orderData} carrier={carrier} i18={i18}/>
            );
            return (
              <TabPanel key={carrier.id} value={carrier.id}>
                {tab}
              </TabPanel>
            );
          })
        }
      </TabContext>
    </div>
  );
  function isDeliveryIncluded(cost, priority) {
    return Number.isFinite(cost) && (cost > 0 || (cost === 0 && priority === 1));
  }
  function handleChange(event, newValue) {
    setTabId(newValue);
    orderData.deliveryTabId = newValue;
  }
}
