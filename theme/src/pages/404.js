import React from "react";
import { graphql } from "gatsby";
import { Box, Typography } from "@material-ui/core";

import Layout from "../components/Layout";
import CollectionsList from "../components/CollectionsList";

export default function CollectionsTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          i18n
        }
      },
      cms: { allCollections }
    }
  } = props;

  return (
    <Layout textAlign="center">
      <Box marginBottom={4}>
        <Typography color="inherit" variant="h5">
          {i18n.errorMessage404}
        </Typography>
        <Typography color="inherit" variant="h5">
          {i18n.guessMessage}
        </Typography>
        <Typography
          color="inherit"
          variant="h3"
          style={{
            fontWeight: "bold",
            fontFamily: "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
            marginBottom: 4,
          }}
        >
          {i18n.ourCollections}
        </Typography>
      </Box>
      <Box flexGrow={1} >
        <CollectionsList collections={allCollections}/>
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        i18n {
          ourCollections
          errorMessage404
          guessMessage
        }
      }
    }
    cms {
      allCollections(filter: { priority_gt: 0 }) {
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


/*
import React from "react";
import Layout from "../components/Layout";
import { Box, Typography } from "@material-ui/core";
import theme from "../style/theme";

export default function Error404Template() {
  return (
    <Layout>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <Box
          flexGrow={1}
          textAlign="center"
          paddingTop={4}
          paddingBottom={12}
          paddingX={8}
          style={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white
          }}
        >
          <Box marginBottom={4}>
            <Typography
              color="inherit"
              variant="h2"
              style={{
                fontWeight: "bold",
                fontFamily:
                  "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
                marginBottom: 4
              }}
            >
              404 Error
            </Typography>
            <Typography color="inherit" variant="body1">
              The requested page was not found.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
*/
