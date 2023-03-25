import React from "react";
import { graphql } from "gatsby";
import { Box, Typography } from "@material-ui/core";

import Layout from "../components/Layout";
import theme from "../style/theme";
import Carousel from "../components/Carousel";
import CollectionsList from "../components/CollectionsList";
import GraphqlFragments from "../components/fragment/GraphqlFragments";

export default function HomeTemplate({
  data: {
    site: {
      siteMetadata: {
        title,
        description,
      }
    },
    cms: { carouselProducts, homeCollections }
  }
}) {
  /* Get the vertical scrollbar offset as a boolean value. */

  // console.log('...zv: Home.carouselProducts:', carouselProducts);
  // console.log('...zv: Home.homeCollections:', homeCollections);

  return (
    <Layout >
      <Box display="flex" flexDirection="column">
        <Box
          textAlign="center"
          paddingTop={1/*4*/}
          paddingBottom={1/*12*/}
          paddingX={8}
          style={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            // clipPath: "polygon(0 0, 100% 0, 100% 60%, 0% 100%)",
            // "-webkit-clip-path": "polygon(0 0, 100% 0, 100% 60%, 0% 100%)" // "WebkitClipPath": "polygon(0 0, 100% 0, 100% 60%, 0% 100%)"
          }}
        >
          <Box marginBottom={4}>
            <Typography
              color="inherit"
              variant="h2"
              style={{
                fontWeight: "bold",
                fontFamily: "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                marginBottom: 4
              }}
            >
              {title}
            </Typography>
            <Typography color="inherit" variant="body1">
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box flexGrow={1}>
        <Carousel products={carouselProducts}/>
        <CollectionsList collections={homeCollections}/>
      </Box>
      <GraphqlFragments/>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    cms {
      carouselProducts: allProducts(limit: 5, filter: { collection: "1" }) {
        id
        slug
        title
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
      homeCollections: allCollections(filter: { priority_gt: 1, priority_lte: 9 }) {
        id
        name
        slug
        priority
        products: Products(limit: 5) {
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
