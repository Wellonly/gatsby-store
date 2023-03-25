import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import {Badge /*Avatar*/} from '@material-ui/core';
import {mediaPathBrowser} from "../../lib/mediaBrowser";
import {Image} from "../mdx/Image";


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     // backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function DeliveryTab({carriers, orderData, i18, ...other}) {
  // const classes = useStyles();
  const [value, setValue] = React.useState('0');

  carriers.forEach((car,i) => {
    let value;
    try {
      const func = new Function(`return ({weight,distance}) => ${car.calc};`);
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
      <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="delivery-tabs">
            {
              carriers.map((item, i) => {
                const image = mediaPathBrowser(item.images.split(',')[0]);
                return Number.isFinite(item.calculated) && (
                  <Tab
                    key={i}
                    label={item.title}
                    value={i.toString()}
                    icon={
                      <Badge badgeContent={`${item.calculated}${i18.currency}`} color="secondary">
                        <Image src={image} width={64} height={55}/>
                      </Badge>
                    }
                  />
                );
              })
            }
          </TabList>
        {
          carriers.map((item, i) => {
            return Number.isFinite(item.calculated) && (
              <TabPanel key={i} value={i.toString()}>
                  {`result: ${item.calculated} for ${item.title}`}
              </TabPanel>
            );
          })
        }
      </TabContext>
    </div>
  );
  function handleChange(event, newValue) {
    setValue(newValue);
  }
}
