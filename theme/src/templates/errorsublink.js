import React from "react";
import { graphql } from "gatsby";
import { Box, Typography } from "@material-ui/core";

import Layout from "../components/Layout";
import {Line} from "../components/mdx/Line";

export default function ErrorSublinkTemplate(props) {
  const {
    data: {
      site: {
        siteMetadata: {
          i18n
        }
      },
      cms: { link, sublink }
    },
    pageContext: {error}
  } = props;

  return (
    <Layout textAlign="center">
      <Typography color="inherit" variant="h3">
        {`${link.label} / ${sublink.label}`}
      </Typography>
      <Typography color="inherit" variant="h5">
        {i18n.someErrorMessage}
      </Typography>
      <Typography color="inherit" variant="h5">
        {error ? error: 'undefined error...'}
      </Typography>
      <Line/>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($linkId: ID!, $parentId: ID!) {
    site {
      siteMetadata {
        i18n {
          ourCollections
          someErrorMessage
          guessMessage
        }
      }
    }
    cms {
      link: Link(id: $parentId) {
        id
        menu
        label
        icon
        slug
        component
      }
      sublink: Sublink(id: $linkId) {
        id
        label
        icon
        slug
        component
      }
    }
  }
`;
