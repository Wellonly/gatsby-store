import React from "react";
import {graphql} from "gatsby";
import {Box, Typography} from "@material-ui/core";

import Layout from "../components/Layout";
import IconBreadcrumbs from "../components/IconBreadcrumbs";
import ProductGrid from '../components/ProductGrid';

export default function CategoryTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          i18n
        }
      },
      cms: { Category: {name, products}}
    }
  } = props;

  // console.log('...zv: CategoryTemplate:', name, {...products});
  const links = [{name: i18n.categories, link: '/categories'}];

  return (
    <Layout flexGrow={1} textAlign="center">
      <IconBreadcrumbs links={links} text={name}/>
      <Box marginTop={2} marginBottom={4}>
        <Typography
          color="inherit"
          variant="h3"
          style={{
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
          {`${i18n.category}: ${name}`}
        </Typography>
      </Box>
      <ProductGrid products={ products }/>
    </Layout>
  );
}

export const query = graphql`
  query($categoryId: ID!) {
    site {
      siteMetadata {
        i18n {
          category
          categories
        }
      }
    }
    cms {
      Category(id: $categoryId) {
        id
        name
        slug
        priority
        products: Products {
          id
          slug
          title
          description
          price
          highprice
          images
          imageFile {
            childImageSharp {
              fluid(maxWidth: 999, quality: 100) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`;
