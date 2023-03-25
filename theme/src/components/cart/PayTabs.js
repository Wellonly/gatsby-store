import React from 'react';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import {mediaPathBrowser} from "../../lib/mediaBrowser";

import {Image} from "../mdx/Image";
import PayByCash from './PayByCash';
import PayByCardOnDelivery from './PayByCardOnDelivery';
import PayByCardOnline from "./PayByCardOnline";

export default function PayTabs({paymethods, carriers, orderData, i18, ...other}) {
  const [payIndex, setPayIndex] = React.useState(paymethods.length && paymethods[0].id);
  orderData.payTab = payIndex;
  // console.log('...zv: PayTabs:', payIndex, paymethods, carriers, orderData, i18);

  return (
    <div {...other}>
      <TabContext value={payIndex}>
        <TabList onChange={handleChange} aria-label="pay-tabs">
          {
            paymethods.map((item) => {
              const image = mediaPathBrowser(item.images.split(',')[0]);
              return (
                <Tab
                  key={item.id}
                  label={item.title}
                  value={item.id}
                  icon={<Image src={image} width={64} height={55}/>}
                />
              );
            })
          }
        </TabList>
        {
          paymethods.map((paymethod) => {
            const tab = paymethod.calc === '3' ? (
              <PayByCardOnline orderData={orderData} paymethod={paymethod} i18={i18}/>
            ) : paymethod.calc === '2' ? (
              <PayByCardOnDelivery orderData={orderData} paymethod={paymethod} i18={i18}/>
            ) : (
              <PayByCash orderData={orderData} paymethod={paymethod} i18={i18}/>
            );
            return (
              <TabPanel key={paymethod.id} value={paymethod.id}>
                {tab}
              </TabPanel>
            );
          })
        }
      </TabContext>
    </div>
  );
  function handleChange(event, newValue) {
    setPayIndex(newValue);
    orderData.payTab = newValue;
  }
}
