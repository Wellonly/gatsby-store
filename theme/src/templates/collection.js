import React from "react";
import {graphql} from "gatsby";
import {Box, Typography} from "@material-ui/core";

import Layout from "../components/Layout";
import IconBreadcrumbs from "../components/IconBreadcrumbs";
import ProductGrid from '../components/ProductGrid';

export default function CollectionTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          i18n
        }
      },
      cms: { Collection: {name, products}}
    }
  } = props;

  // console.log('...zv: CollectionTemplate:', name, {...products});
  const links = [{name: i18n.collections, link: '/collections'}];

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
          {`${i18n.collection}: ${name}`}
        </Typography>
      </Box>
      <ProductGrid products={ products }/>
    </Layout>
  );
}


/*
          imageFile {
            childImageSharp {
              fixed {
                ...GatsbyImageSharpFixed
              }
            }
          }

          imageFile {
            childImageSharp {
              fluid(maxWidth: 999, quality: 100) {
                ...GatsbyImageSharpFluid
                presentationWidth
              }
            }
          }
 */

export const query = graphql`
  query($collId: ID!) {
    site {
      siteMetadata {
        i18n {
          collection
          collections
        }
      }
    }
    cms {
      Collection(id: $collId) {
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
