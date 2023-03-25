import React from "react";
import { graphql } from "gatsby";
import { Box, Typography } from "@material-ui/core";

import Layout from "../components/Layout";
import CategoriesList from "../components/CategoriesList";

export default function CategoriesTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          i18n
        }
      },
      cms: { allCategories }
    }
  } = props;

  return (
    <Layout textAlign="center">
      <Typography
        color="inherit"
        variant="h3"
        style={{
          fontWeight: "bold",
          fontFamily: "Work Sans, -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
          marginBottom: 4,
        }}
      >
        {i18n.ourCategories}
      </Typography>
      <Box flexGrow={1}>
        <CategoriesList categories={allCategories}/>
      </Box>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        i18n {
          ourCategories
        }
      }
    }
    cms {
      allCategories(filter: { priority_gt: 0 }) {
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
