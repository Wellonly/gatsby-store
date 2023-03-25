import React, {useEffect, useRef, useState} from "react";
import {
  Box,
  Accordion, AccordionDetails, AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select, Typography
} from "@material-ui/core";
import { MdExpandMore, MdSchedule as TimeIcon, MdPhone, MdLocationOn } from "react-icons/md";

import {Map} from "../mdx/Map";
import {makeOpenStreetSlug} from "../../lib/slug";

export default function DeliveryBySelfForm({offices, orderData, carrier, i18}) {
  const {city} = orderData;
  const cityOffices = offices.reduce((acc,office) => {
    if (!city || office.city_id === city.id) return [...acc, office];
    return acc;
  },[]);
  const [officeTitle, setOfficeTitle] = useState(cityOffices.length ? cityOffices[0].title: '');
  orderData.officeTitle = officeTitle;
  const [expanded, setExpanded] = useState(false);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });
  let root_width = 0;
  const funcRef = useRef(null);
  // console.log('...zv: DeliveryBySelfForm:',cityOffices);
  return (
    <Paper ref={funcRef} style={{marginLeft:-25}}>
      <FormControl fullWidth>
        <InputLabel id="select-place">{i18.place}</InputLabel>
        <Select
          labelId="select-place"
          id="select-id"
          value={officeTitle}
          onChange={handleChange}
        >
          {cityOffices.map((office,i) => {
            return (
              <MenuItem key={i} value={office.title}>{`${office.title}; ${office.address}; ${office.worktime}`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Accordion expanded={expanded} onChange={(e, isExpanded) => setExpanded(isExpanded)}>
        <AccordionSummary expandIcon={<MdExpandMore/>} aria-controls="panel1a-content">
          <Typography>{i18.extraInfo}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            cityOffices.map((office,i) => {
              return (expanded && office.title === officeTitle) ? (
                <Box key={i} >
                  <Typography style={{marginTop:-22}} variant="h6">{office.title}</Typography>
                  {IconWithInfo(<MdLocationOn/>, office.address)}
                  {IconWithInfo(<TimeIcon/>, office.worktime)}
                  {IconWithInfo(<MdPhone/>, office.phone)}
                  {(office.latitude >0 && office.longitude >0) ?
                    <Map id="iframe-map-id" src={makeOpenStreetSlug(office.latitude, office.longitude)}/>:
                    undefined
                  }
                </Box>
              ): undefined;
            })
          }
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
  function handleChange(event) {
    setOfficeTitle(event.target.value);
    orderData.officeTitle = event.target.value;
  }
  function handleWindowWidthChange() {
    const func_ref = funcRef && funcRef.current;
    const funcWidth = func_ref && func_ref.clientWidth;
    if (funcWidth && root_width !== funcWidth) {
      const mapFrame = document.getElementById('iframe-map-id');
      if (mapFrame) {
        root_width = funcWidth;
        mapFrame.setAttribute('width', funcWidth);
        // console.log('...zv: mapFrame width:', mapFrame.clientWidth);
      }
    }
  }
  function IconWithInfo(icon, text) {
    return (
      <Box display="flex" style={{marginTop: 10}}>
        {icon}
        <Typography style={{marginLeft: 11, marginTop: -10}} variant="h6">{text}</Typography>
      </Box>
    );
  }
}
