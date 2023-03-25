import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import IconBreadcrumbs from "../components/IconBreadcrumbs";
import {makeCategorySlug} from '../lib/slug';
import ProductView from "../components/product/ProductView";
import ProductArticle from "../components/product/ProductArticle";

export default function Product(props) {
  console.log('...zv prod page:', props);
  const { data, pageContext, location } = props;
  const { site, cms: {products} } = data;
  const productId = location?.state?.productId || pageContext?.productId;
  const {i18n} = site.siteMetadata;
  window.cfg = Object.assign(window?.cfg || {}, site.siteMetadata);

  const prod = products.length ? (productId ? products.find(p => p.id === productId) || products[0]: products[0]): {};

  const prodCategory = prod.Category;
  const mdxBody = prod.mdx?.body;

  const breadcrumbsLinks = prodCategory ? [{name: `${i18n.category}: ${prodCategory.name}`, link: makeCategorySlug(prodCategory)}]: [];

  // const classes = useStyles();
  return (
    <Layout >
      <IconBreadcrumbs links={breadcrumbsLinks} text={prod.title}/>
      <ProductView products={products} product={prod} i18={i18n}/>
      <h2>...next Product Article...</h2>
      { mdxBody && <ProductArticle body={mdxBody}/> }
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        MEDIA_HOST_URL
        i18n {
          category
          variant
          currency
          bulkFrom
          quantity
          available
          buyNow
          addToCart
        }
      }
    }
    cms {
      products: allProducts(filter: { priority_gt: 0, slug: $slug}) {
        ...productFields
      }
    }
  }
`;
