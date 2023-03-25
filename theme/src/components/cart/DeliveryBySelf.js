import React/*, {useState}*/ from "react";
import {graphql, StaticQuery} from "gatsby";

import DeliveryBySelfForm from "./DeliveryBySelfForm";

export default function DeliveryBySelf(props) {
    // console.log('...zv: DeliveryBySelf:',props);
    return (
        <StaticQuery
            query={graphql`
                {
                    cms {
                      offices: allOffices(filter: { priority_gt: 0}) {
                        city_id
                        priority
                        services
                        title
                        descript
                        address
                        latitude
                        longitude
                        worktime
                        phone
                        slug
                      }
                    }
                }
              `}
            render={({ cms: { offices } }) => {
                return (
                  <DeliveryBySelfForm offices={offices} {...props}/>
                );
            }}
        />
    );
}
