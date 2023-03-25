import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import Cart from "../components/cart/Cart";

export default function CartTemplate(props) {
  const { data } = props;
  const { site, cms: {carriers, paymethods, cities} } = data;
  window.cfg = Object.assign(window?.cfg || {}, site.siteMetadata);

  return (
    <Layout >
      <Cart carriers={carriers} paymethods={paymethods} cities={cities} i18={site.siteMetadata.i18n}/>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        MEDIA_HOST_URL
        locale
        countryCode
        i18n {
          cart
          toPrint
          currency
          quantity
          goodsInCart
          fillOrder
          makeOrder
          name
          price
          sum
          restoreDeleted
          total
          yourCity
          country
          buyer
          privatePerson
          organization
          preferableDate
          time
          delivery
          deliveryAddress
          payMethod
          contactInfo
          extraInfo
          fill
          place
        }
      }
    }
    cms {
      carriers: allCarriers(filter: { priority_gt: 0}) {
        id
        priority
        title
        descript
        icon
        slug
        calc
        images
      }
      paymethods: allPaymethods(filter: { priority_gt: 0}) {
        id
        priority
        title
        descript
        icon
        slug
        calc
        images
      }
      cities: allCities(filter: { rating_gt: 0}) {
        id
        name    
        area
        countryCode
        postal
        phone
        latitude
        longitude
      }
    }
  }
`;
